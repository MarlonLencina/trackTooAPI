
import { app } from "./app";
import { createConnection } from "typeorm";

createConnection()

const port = 3333

app.listen(3333, () => {
    console.log(`server is listen on ${port}`)
})