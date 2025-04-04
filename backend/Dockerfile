FROM python:3.12-alpine

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install pytest

EXPOSE 8000

CMD ["python", "app/main.py"]