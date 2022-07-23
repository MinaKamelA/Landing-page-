/* Constants and variables declaration */

const fragment = document.createDocumentFragment();
const sections = document.querySelectorAll('section');
const menu = document.querySelector('.nav-menu');
const shapes = document.querySelectorAll('.shape');
const collapsbles = document.querySelectorAll('.collapsable');
let currentActive = 0;
let notScrolling;

/* Creating navigation menu */
/* Itteration through existing sections */
for(let i = 0; i<sections.length; i++){
	let address = sections[i].getAttribute('id');					/*getting section id to use as anchor href*/
	let name = sections[i].dataset.name;							/*getting section data-name to use as anchor display text*/
	let linkText = (i===0) ?`<a href="#${address}" class="nav-link active-link"> ${name}</a>` 
	: `<a href="#${address}" class="nav-link"> ${name}</a>`;		/*creating anchor element text*/
	let linkElement = document.createElement('li');					/*creating empty list item*/
	linkElement.className = 'menu-item';							/*adding proper class to list item*/
	linkElement.innerHTML = linkText;								/*adding anchor element to list item*/
	fragment.appendChild(linkElement);								/*adding the list item to the document fragment*/
}

/*Add list items to existing unordered list element through document fragment*/
menu.appendChild(fragment);													

/*Storing the dynamically created links into links constant to be used later*/
const links= document.querySelectorAll('.nav-link');

/*The function to add/remove proper classes to different elements once a section get active*/
function setActives(sectionIndex, isClickEvent){						/*The Index of the section to be activated & a boolean value to determine if the function should scroll or not*/
	if(sectionIndex != currentActive){									/*checking if the section is not already active*/
		links[sectionIndex].classList.toggle('active-link');			
		links[currentActive].classList.toggle('active-link');
		shapes[sectionIndex].classList.toggle('do-trick');
		shapes[currentActive].classList.toggle('do-trick');
		sections[currentActive].classList.toggle('active');
		currentActive = sectionIndex;
		sections[sectionIndex].classList.toggle('active');
	}
	if(isClickEvent){
		sections[sectionIndex].scrollIntoView({behavior : 'smooth'});	/*scroll smoothly to the section (can be deleted and still the scroll will work smooth due to the css definition of smooth scrolling, just didn't know if I was required to achieve this with javascript or not)*/
	}
}

/*Add the click event listener to all the dynamicaly created navigation menu links*/
for(link of links){
	link.addEventListener('click', function jumpToSection(event){
		event.preventDefault();
		let name = event.target.getAttribute('href');
		name= name.substr(1,name.length-1);
		for(i in sections){
			if(sections[i].id=== name){
				setActives(i, true);
			}
		}
	});
}

/*Add the scroll event listener to the document/*/
document.addEventListener('scroll', function(){
	document.querySelector('header').classList.remove('hide-header');		/*make navigation menus visible since we scroll*/
	window.clearTimeout(notScrolling);										/*clear the timeout for not scrolling as long as we scroll*/
	let viewHeight = window.visualViewport.height;
	for (let i=0; i< sections.length; i++){
		if(sections[i].getBoundingClientRect().top <= viewHeight && 
			(sections[i].getBoundingClientRect().bottom >= viewHeight 
				|| sections[i].getBoundingClientRect().bottom >= 100)){		/*check if the section in visual view*/
			setActives(i, false);
			break;
		}
	}
	notScrolling = setTimeout(function() {document.querySelector('header').classList.add('hide-header');}, 3000); /*setting time out after scroll end with 3 seconds to hide the navigation menu*/
});
