import express from "express";
import moment from "moment";
import axios from "axios";
import { log } from "console";

const app = express();
const port = 8080;

app.get("/reservations", (req, res) => {
    var date : any = req.query.date;
    var resourceId : any = req.query.resourceId;

    if (!moment(date, moment.ISO_8601, true).isValid()) {
        res.status(400).json({ "error": "wrong format for param startDatetime" });
        return;
    }
    if (resourceId != 1337) {
        res.status(404).json({ "error": "resource not found" });
        return;
    }

    if (moment().isSame(moment(date), 'day')) {
        res.json({ "reservations": [
                { "reservationStart": moment().set({ 'hour': 8, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss"), "reservationEnd": moment().set({ 'hour': 9, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss") },
                { "reservationStart": moment().set({ 'hour': 10, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss"), "reservationEnd": moment().set({ 'hour': 11, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss") },
                { "reservationStart": moment().set({ 'hour': 15, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss"), "reservationEnd": moment().set({ 'hour': 16, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss") }
            ] });
    }
    else {
        res.json({ "reservations": null });
    }
});

app.get("/timetables", (req, res) => {
    var date : any = req.query.date;
    var resourceId : any = req.query.resourceId;

    if (!moment(date, moment.ISO_8601, true).isValid()) {
        res.status(400).json({ "error": "wrong format for param startDatetime" });
        return;
    }
    if (resourceId != 1337) {
        res.status(404).json({ "error": "resource not found" });
        return;
    }

    if (moment().isSame(moment(date), 'day')) {
        res.json({ "open": true,
            "timetables": [
                { "opening": moment().set({ 'hour': 8, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss"), "closing": moment().set({ 'hour': 12, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss") },
                { "opening": moment().set({ 'hour': 14, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss"), "closing": moment().set({ 'hour': 18, 'minute': 0, 'second': 0 }).format("YYYY-MM-DD HH:mm:ss") }
            ] });
    }
    else {
        res.json({ "open": false, timetables: null });
    }
});

app.get("/freeRooms", (req, res) => {
    var date : any = req.query.date;
    var resourceId : any = req.query.resourceId;

    axios.get(`http://localhost:8080/reservations?date=${date}&resourceId=${resourceId}`)
    .then(function (response){
        var reservetions = response.data.reservations;
    })
    .catch(function (error) {
        console.log(error);
      });

    axios.get(`http://localhost:8080/timetables?date=${date}&resourceId=${resourceId}`)
    .then(function (response){
        var open = response.data.open;
    })
    .catch(function (error) {
        console.log(error);
      });

    if(open === true ){
        res.json({ "available": true });
    } else {
        res.json({ "available": true });
    }

})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});