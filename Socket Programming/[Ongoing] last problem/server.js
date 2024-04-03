// Complete the server.js file to make user's add, delete and update the todos.
import express from "express"
import http from "http"
import {Server} from "socket.io"
import cors from "cors";
import Task from "./task.schema.js"

export const app = express();
app.use(cors());

// 1. Creating server using http.
export const server = http.createServer(app);

// 2. Create socket server.
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// 3. Use socket events.
io.on("connection", (socket) => {
    console.log("Connection made.");

    socket.on("createTask", (task)=>{
        // task add in database
        console.log(task);
        const newTask = new Task({text: task});
        newTask.save()
        .then(tasks=>{
            // broadcast this message to all the clients.
            io.emit("addtask", newTask)
            //socket.broadcast.emit("broadcast", tasks)
        }).catch(err=>{
            console.log(err);
        })
    })

    socket.on("deleteTask", (taskId)=>{
        console.log("in server",taskId)
        Task.findByIdAndDelete({_id: taskId})
        .then(()=>{
            io.emit("taskDeleted", taskId)
        }).catch((err)=>{
            console.log(err); 
        })
    })

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});
