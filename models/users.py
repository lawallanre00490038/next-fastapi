from mongoengine import Document, ListField, StringField, URLField

class Tutorial(Document):
  title = StringField(required=True, max_length=70)
  name = StringField(required=True, max_length=20)