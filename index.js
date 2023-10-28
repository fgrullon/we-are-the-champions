// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, set} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-dbd3a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsDB = ref(database, "endorsements")

const endorsementInput = document.querySelector(".endorsement-input")
const publishBtn = document.querySelector(".publish-btn")
const fromInput = document.querySelector("#from-input")
const toInput = document.querySelector("#to-input")
const endorsementList = document.querySelector(".endorsementList")




publishBtn.addEventListener("click", function(){
    push(endorsementsDB, formatEndorsement())
    console.log(formatEndorsement())
})

onValue(endorsementsDB, function(snapshot){
    if (snapshot.exists()) {
        let endorsements = Object.entries(snapshot.val())
        
    
        // clearShoppingListEl()
        
        for (let i = 0; i < endorsements.length; i++) {
            let endorsementId = endorsements[i][0]
            let endorsement = endorsements[i][1]
                    
            appendItemToEndorsementEl(endorsementId, endorsement)
            // appendItemToShoppingListEl(currentItem)
        }    
    } else {
        // shoppingListEl.innerHTML = "No items here... yet"
    }
})



function formatEndorsement(){
    return {
        from : fromInput.value,
        to : toInput.value,
        endorsement: endorsementInput.value,
        likes: 0
    }
}

function appendItemToEndorsementEl(endorsementId, endorsement){
    
    let h4to = document.createElement("h4")
    h4to.textContent = `To ${endorsement.to}`
    
    let parag = document.createElement("p")
    parag.textContent = endorsement.endorsement
    
    let h4from = document.createElement("h4")
    h4from.textContent = `From ${endorsement.from}`
        
    let h4likes = document.createElement("h4")
    h4likes.textContent = `🖤 ${endorsement.likes}`

    let main = document.createElement("main")  
    main.appendChild(h4to)
    main.appendChild(parag)
      
    let footer = document.createElement("footer")
    footer.appendChild(h4from)
    footer.appendChild(h4likes)
    
    
    let article = document.createElement("article")
    article.className = "endorsement"
    article.appendChild(main)
    article.appendChild(footer)
    
    article.addEventListener("dblclick", function(){
        set(ref(database, `endorsements/${endorsementId}`), {
            from : endorsement.from,
            to : endorsement.to,
            endorsement: endorsement.endorsement,
            likes: endorsement.likes + 1
        });
    })
    endorsementList.appendChild(article)
}


 