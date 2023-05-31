import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
const app = express()

import {
    getActivations,
    createActivation,
    deleteActivations,
    getActivationByMachineCode,
} from "./services.js"

app.get("/validation", async (req, res, next) => {
    const { machineCode, secrectKey } = req.query
    const activations = await getActivations()

    const result = activations.filter(
        (activations) =>
            activations.machineCode === machineCode && activations.secrectKey === secrectKey
    )

    // result.length > 0
    //     ? res.send({ status: true, data: result })
    //     : res.send({ status: false, data: "validation error" })

    res.send(result.length > 0)
})

app.get("/create", async (req, res, next) => {
    if (req.query.machineCode) {
        try {
            const isExistActivation = await getActivationByMachineCode(req.query.machineCode)
            if (!isExistActivation) {
                const activation = await createActivation(req.query.machineCode)
                res.send({ status: true, data: activation })
            } else {
                res.send(isExistActivation)
            }
        } catch (error) {
            res.send({ status: false, data: error.message })
        }
    }
    next()
})

app.get("/delete", async (req, res, next) => {
    const result = await deleteActivations()
    res.send(result)
    next()
})

app.get("/get/admin/sheng", async (req, res, next) => {
    res.send(await getActivations())
    next()
})

app.listen(process.env.PORT, () => {
    console.log(`server listening on port: ${process.env.PORT}`)
})
