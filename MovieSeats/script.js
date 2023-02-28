
// query selector selects just 1 element satisfying the condition
const container = document.querySelector(".container");
// query selector all retursn a nodelist (like an array) of elements satisfying the condition
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = parseInt(movieSelect.value);
console.log(ticketPrice);

populateUi();

function populateUi() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=> {
            if(selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    
    console.log(selectedSeats);
}

// function updateSelectedCount(countNum, element){
    //     console.log(countNum);
    //     if (element.classList.contains("selected")){
        //         countNum += 1;
        //     }
        //     else {
            //         countNum -= 1;
            //     }
            //     count.innerHTML = countNum;
            //     }
            
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsCount = selectedSeats.length;
    let seatsIndex = [...selectedSeats ].map(function(seat){
        return [...document.querySelectorAll(".seat")].indexOf(seat);
    } );
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    console.log(seatsIndex);
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}
function updateTotal(price,countNum){
    let newtotal = (price*countNum);
    total.innerHTML = newtotal;
}
function setMovieData(movieIndex, movieValue){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMovieValue", movieValue);
    console.log("succesfully stored movie data")
}

// movie event
movieSelect.addEventListener("change", (e) => {
    ticketPrice = parseInt(e.target.value);
    updateTotal(ticketPrice, parseInt(count.innerHTML));
    setMovieData(e.target.selectedIndex, e.target.value);
})


// seat event
container.addEventListener("click", (e) => {
    if((e.target.classList.contains("seat")) && (!e.target.classList.contains("occupied"))) {
        e.target.classList.toggle("selected");
        updateSelectedCount(parseInt(count.innerHTML), e.target);
        updateTotal(ticketPrice, parseInt(count.innerHTML));
    }

})

function saveIndex(row, seat){
    seatsIndex[row][seat]=1;
}

updateSelectedCount();