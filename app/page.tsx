"use client";
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

interface NameData {
  name: string;
}
type Inputs = {
  name: string;
  title: string;
};

export default function Home() {
  const fetchName = async () => {
    const response = await fetch("/api/python");
    if (!response.ok) throw new Error("something went wrong");

    const data = await response.json();
    console.log(data)
    return data;
  };

  const { data, isLoading, error } = useQuery<NameData>({
    queryKey: ['message'],
    queryFn: fetchName,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch("http://127.0.0.1:8000/api/senduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json()
      console.log(result)
    }

    else {
      throw new Error("Something went wrong")
    }
  }


  useEffect(()=> {
    fetchName()
  }, [])

  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching data. {error.message}</div>;

  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      <h1>My Name is {data?.name}</h1>
      <form className="bg-slate-300 flex flex-col gap-4 w-[300px]" onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="text" 
          {...register("name", { required: true })} 
          placeholder="Enter your name" 
          className="p-4"
        />
        {errors.name && <span className='text-red-500'>This field is required</span>}

        <input 
          type="text" 
          {...register("title", { required: true })} 
          placeholder="Enter your title" 
          className="p-4"
        />
        {errors.title && <span className='text-red-500'>This field is required</span>}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
