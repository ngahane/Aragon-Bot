let fs = require('fs')

fs.readFileAsync = (file, enc)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(file, enc, (err, data)=>{
            if (err) 
                reject(err)
            else
                resolve(data)
        })
    })
}

class Aragon{

    constructor(){
        this.enData
        this.frData
        this.language = 'en'

        fs.readFileAsync('./config/Aragon-en.json', 'utf8')
        .then((data)=> this.enData = JSON.parse(data) )
        .catch((err)=> console.log(err) )

        fs.readFileAsync('./config/Aragon-fr.json', 'utf8')
        .then((data)=> this.frData = JSON.parse(data) )
        .catch((err)=> console.log(err) )
    }

    getLanguage(){
        return this.language
    }

    setLanguage(lang){
        this.language = lang
    }

    getQuestions(){
        if(this.language === 'en')
            return Object.keys(this.enData)
        if(this.language === 'fr')
            return Object.keys(this.frData)
    }

    getAnswers(){
        if(this.language === 'en')
            return Object.values(this.enData)
        if(this.language === 'fr')
            return Object.values(this.frData)
    }

    searchQuestion(key){
        let found = this.getQuestions().indexOf(key)
        if(found != -1)
            return this.getAnswers()[found][0]
        else
            return 'Error Not found'
    }

    searchAnswers(key){
        let found = this.getQuestions().indexOf(key)
        if(found != -1)
            return this.getAnswers()[found][1]
        else
            return 'Error Not found'
    }

    verifyAnwser(key, anwser){
        let found = this.getQuestions().indexOf(key)
        if(found != -1){
            let result = this.getAnswers()[found][1].find(function(element) {
                return element == anwser
            })
            if(result != undefined)
                return true
            else
                return false
        }else{
            return 'Error Not found'
        }
    }
}