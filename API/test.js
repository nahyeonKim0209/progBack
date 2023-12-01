const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry =>{
        if (entry.isIntersecting) observer.unobserve(entry.target);

    })
    console.log(entries);
})

const lastCard = new IntersectionObserver(entries => {
    const lastCard = entries[0]
    if (!lastCard.isIntersecting) return loadNewCards();
}, {})

lastCard.observe(document.querySelector("select user_id from user_info limit 10"))

function loadNewCards() {
    
}

cards.forEach(cards =>{
    observer.observe(cards);
})