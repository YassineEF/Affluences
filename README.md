# reservation-service

This service fetchs information from reservation database.

## Routes

### Reservations

This route returns reservations for a given resource for a date

**URI** : /reservations

**Method** : GET

**Parameters**

| name | type | required |
| ------ | ------ | ------|
| date | date in format YYYY-MM-DD | yes |
| resourceId | int | yes |

**Example**

GET http://ip:port/reservations?date=2020-03-19&resourceId=1337

Response

```json
{
    "reservations": [
        {
            "reservationStart": "2020-03-19 08:00:00",
            "reservationEnd": "2020-03-19 09:00:00"
        },
        {
            "reservationStart": "2020-03-19 10:00:00",
            "reservationEnd": "2020-03-19 11:00:00"
        },
        {
            "reservationStart": "2020-03-19 15:00:00",
            "reservationEnd": "2020-03-19 16:00:00"
        }
    ]
}
```

### Timetables

This route returns opening slots for a given resource for a date

**URI** : /timetables

**Method** : GET

**Parameters**

| name | type | required |
| ------ | ------ | ------|
| date | date in format YYYY-MM-DD | yes |
| resourceId | int | yes |

**Example**

GET http://ip:port/timetables?date=2020-03-19&resourceId=1337

Response

```json
{
    "open": true,
    "timetables": [
        {
            "opening": "2020-03-19 08:00:00",
            "closing": "2020-03-19 12:00:00"
        },
        {
            "opening": "2020-03-19 14:00:00",
            "closing": "2020-03-19 18:00:00"
        }
    ]
}
```

## Build and run

The prefered method to run the service is to run it with docker. 
There is a Dockerfile available. You should build the image before running it. 
The container will expose the API through port 8080. Don't forget to bind 
the port when launching the container to access the API !

If you are not confortable with Docker, you can deploy the service by installing 
the dependencies by running the command "npm install" from a terminal
and then run the service with "npm run start".