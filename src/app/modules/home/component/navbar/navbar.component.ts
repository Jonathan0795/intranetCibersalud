import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const listElements= document.querySelectorAll('.list__button--click');
    listElements.forEach(listElement => {
      listElement.addEventListener('click', () => {
        listElement.classList.toggle('arrow');
        let height = 0;
        let menu = listElement.nextElementSibling as HTMLInputElement;
        if (menu.clientHeight == 0) {
          height = menu.scrollHeight;
        }
        menu.style.height = height + "px";
      })
    });
  }

}
