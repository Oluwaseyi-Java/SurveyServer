const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const {
    Response, Question, Survey, Surveys, Fsurvey
} = require("../models/Survey")

/////////
const setFSurvey = async (fsurvey) => {
    const docFSurvey = await Fsurvey.create(fsurvey)
    console.log("FSurvey created")
    return docFSurvey
}

// const setSurveys = async (fsurveyId, surveys) => {
//     const docSurveys = await Surveys.create()
//     console.log("Surveys created")
//     return FSurvey.findByIdAndUpdate(
//         fsurveyId,
//         {
//             $push: {
//                 surveyData: {
//                     _id: docSurveys._id,
//                 }
//             }
//         },
//         {
//             new: true, useFindAndModify: false
//         }
//     )
// }

const setSurvey = async (fsurveyId, survey) => {
    const docSurvey = await Survey.create(survey)
    console.log("Survey created")
    return await Fsurvey.findByIdAndUpdate(
        fsurveyId,
        {
            $push: {
                surveyData: {
                    _id: docSurvey._id,
                    title: docSurvey.title,
                }
            }
        },
        { new: true, useFindAndModify: false }
    )
}

const setQuestion = async (surveyId, question) => {
    const docQuestion = await Question.create(question)
    console.log("Question created")
    return await Survey.findByIdAndUpdate(
        surveyId,
        {
            $push: {
                questions: {
                    _id: docQuestion._id,
                    headTitle: docQuestion.headTitle,
                    inputType: docQuestion.inputType,
                    type: docQuestion.type,
                    isOption: docQuestion.isOption,
                    options: docQuestion.options,
                    isRequired: docQuestion.isRequired
                }
            }
        },
        { new: true, useFindAndModify: false }
    )
}

const setResponse = async (surveyId, response) => {
    const docResponse = await Response.create(response)
    console.log("Response created")
    return await Survey.findByIdAndUpdate(
        surveyId,
        {
            $psuh: {
                responses: {
                    _id: docResponse._id,
                    response: docResponse.response
                }
            }
        },
        { new: true, useFindAndModify: false }
    )
}
///////////

//get

// router.get("/login", (req, res) => {

//     Fsurvey.find().exec()
//         .then((result) => {
//             res.send(result)
//             console.log(result)
//         })
//         .catch((err) => {
//             res.send(err)
//             console.log(err)
//         })

//     // res.send({ message: "conected" });
//     console.log(req.body)
// })

// router.get("/sign-up", (req, res) => {
//     Fsurvey.find().exec()
//         .then((result) => {
//             res.send(result)
//             console.log(result)
//         })
//         .catch(error => {
//             res.send(error)
//             console.log(error)
//         })
// })

router.get("/:userid/dashboard", (req, res) => {
    Fsurvey.find().exec()
        .then(result => {
            res.send(result)
            console.log(result)
        })
        .catch(error => {
            res.send(error)
            console.log(error)
        })
})

router.get("/survey/response/:id", (req, res) => {
    res.send(req.params)
})

router.get("/userid/surveys", (req, res) => {

})
router.get("/create/:userid/:surveyid/:surveyname", (req, res) => {
    res.send("create data")
})

router.get("/response/survey/:name/:surveyid", (req, res) => {
    res.send("responsev data")
})

//end of get

////

//post
router.post("/sign-up", (req, res) => {
    console.log(req.body)

    setFSurvey({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        phoneNo: req.body.phoneNumber,
        password: req.body.password
    })
        .then(result => {
            // setSurveys(result._id, {
            //     _id: mongoose.Types.ObjectId()
            // })
            //     .then(result => {
            //         console.log(result)

            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
            res.send(result)
            console.log(result)
        })
        .catch(error => {
            res.send(error)
            console.log(error)
        })
})

router.post("/login", (req, res) => {

    const details = { "email": req.body.email }
    Fsurvey.findOne(details, (err, item) => {
        if (err) {
            res.send({ 'error': "An error has occured", "message": err })
            console.log(err)
        }
        else {
            if (item.email === req.body.email) {
                res.send(item)
                console.log(item)
            }
        }
    })
})

router.post("/create/:userid/:surveyid/:surveyname", (req, res) => {
    console.log(req.body);

    setQuestion(req.params.surveyid, {
        _id: mongoose.Types.ObjectId(),
        headTitle: req.body.headTitle,
        inputType: req.body.inputType,
        type: req.body.type,
        isOption: req.body.isOption,
        options: req.body.options,
        isRequired: req.body.isRequired
    })
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })

})

router.post("/response/survey/:name/:surveyid", (req, res) => {
    console.log(req.body);

    setResponse(req.params.surveyid, {
        _id: mongoose.Types.ObjectId(),
        response: req.body.response
    })
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })

})

router.post("/createsurvey/:userid", (req, res) => {

    console.log(req.body)

    setSurvey(req.params.userid, {
        _id: mongoose.Types.ObjectId(),
        title: req.body.title
    })
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

//end of psot

//start of additional middleware

router.put("/create/:userid/:surveyid/:surveyname", (req, res) => {


})


module.exports = router