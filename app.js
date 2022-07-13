//PART ONE

// BASE_URL = "http://numbersapi.com"
// // //1.
// async function numberFact(num){
//     let res = await axios.get(`${BASE_URL}/${num}?json`)
//     console.log(res.data.text)
// }
// //Springboard Answer
// let favNumber = 5;
// let baseURL = "http://numbersapi.com";

// async function part1() {
//   let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
//   console.log(data);
// }
// part1();
// // //2.
// async function multipleNumFacts(a,b,c){
//     let res1 =  await axios.get(`${BASE_URL}/${a}?json`)
//     console.log(res1.data.text)
//     let res2 =  await axios.get(`${BASE_URL}/${b}?json`)
//     console.log(res2.data.text)
//     let res3 =  await axios.get(`${BASE_URL}/${c}?json`)
//     console.log(res3.data.text)
// }

// async function multiNumFactsParallel(a,b,c){
//     let res1Promise = axios.get(`${BASE_URL}/${a}?json`);
//     let res2Promise = axios.get(`${BASE_URL}/${b}?json`);
//     let res3Promise = axios.get(`${BASE_URL}/${c}?json`);

//     let res1 = await res1Promise;
//     let res2 = await res2Promise;
//     let res3 = await res3Promise;

//     console.log(res1.data.text)
//     console.log(res2.data.text)
//     console.log(res3.data.text)
// }

// //Springboard Answer
// const favNumbers = [7, 11, 22];
// async function part2() {
//   let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
//   console.log(data);
// }
// part2();
// // //3. 

// async function fourFacts(num){
//     let res1Promise = axios.get(`${BASE_URL}/${num}?json`);
//     let res2Promise = axios.get(`${BASE_URL}/${num}?json`);
//     let res3Promise = axios.get(`${BASE_URL}/${num}?json`);
//     let res4Promise = axios.get(`${BASE_URL}/${num}?json`);

//     let res1 = await res1Promise;
//     let res2 = await res2Promise;
//     let res3 = await res3Promise;
//     let res4 = await res3Promise;

//     console.log(res1.data.text)
//     console.log(res2.data.text)
//     console.log(res3.data.text)
//     console.log(res4.data.text)
//     $('body').append(`<p>${res1.data.text}</p>`)
//     $('body').append(`<p>${res2.data.text}</p>`)
//     $('body').append(`<p>${res3.data.text}</p>`)
//     $('body').append(`<p>${res4.data.text}</p>`)
// }

// //Springboard Answer
// async function part3() {
//     let facts = await Promise.all(
//       Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
//     );
//     facts.forEach(data => {
//       $('body').append(`<p>${data.text}</p>`);
//     });
//   }
//   part3();


// // **********************************************************************
// //      PART TWO
// // **********************************************************************
$(function() {
    let baseURL = 'http://deckofcardsapi.com/api/deck'

//1. 

    async function cardRequest(){
        let res = await axios.get(`${baseURL}/new/draw/?count=1`)
        let { suit, value } = res.data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    }
//2.

    let firstCard = null;
    async function twoCardRequest(){
        let res = await axios.get(`${baseURL}/new/draw`)
        let firstCard = res.data.cards[0]
        let deckId = res.data.deck_id;
        let res2 = await axios.get(`${baseURL}/${deckId}/draw/`)
        let secondCard = res2.data.cards[0]
        let pair = [firstCard, secondCard]
        pair.forEach(function(card){
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
        })
    }
// //3. 
    


    async function showCards(){
        let $btn = $('button');
        let $cardArea = $('#card-area');

        let deckData = await axios.get(`${baseURL}/new/shuffle/`);
        console.log(deckData)
        $btn.show().on('click', async function() {
            let cardData = await $.getJSON(`${baseURL}/${deckData.data.deck_id}/draw/`);
            console.log(cardData)
            let cardSrc = cardData.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (cardData.remaining === 0) $btn.remove();
        });
        
    }
    showCards()
});

