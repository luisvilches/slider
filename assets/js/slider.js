//slider 
var slider = {
    index: 0,
    config: {},
    items: null,
    init: function (obj) {
        // initial function that creates the structure of the slider
        this.config = obj;
        // The containers and buttons prev and next are instantiated
        const container = document.querySelector(this.config.container);
        const prev = document.querySelector(this.config.prev);
        const next = document.querySelector(this.config.next);
        // all the slides are obtained
        const items = Array.from(container.querySelectorAll('.item'));
        // the events of the prev and next buttons are added
        prev.addEventListener('click', () => this.prev());
        next.addEventListener('click', () => this.next());

        // they go through the slides
        items.forEach((item, index) => {
            // the structure is created in the DOM
            var box = document.createElement('div');
            var link = document.createElement('a');
            var img = document.createElement('img');
            // the data that comes from the dataset is passed
            var bg = item.dataset.background;
            var desktop = item.dataset.desktop;
            var mobile = item.dataset.mobile;
            var url = item.dataset.href;
            
            box.style.backgroundImage = "url(" + bg + ")";

            if (parseInt(item.dataset.index) == 0) {
                box.classList.add('active');
            }

            box.dataset.index = item.dataset.index;
            box.dataset.title = item.dataset.title;
            box.dataset.text = item.dataset.text;
            box.className = "item";
            link.href = url;
            // the configuration is passed for the responsive image change
            this.imgResponsive(img, desktop, mobile);

            window.addEventListener('resize', () => {
                this.imgResponsive(img, desktop, mobile);
            });
            // the slides are inserted in the DOM
            link.appendChild(img);
            box.appendChild(link);
            container.appendChild(box);
            container.appendChild(prev);
            container.appendChild(next);
            container.removeChild(item);

        });

        this.loadSlider();
    },

    imgResponsive: function (img, desktop, mobile) {
        // function that changes the image according to mediaQuery
        if (this.mediaQuery("min-width", 768)) {
            img.src = desktop;
        } else {
            img.src = mobile;
        }
    },

    loadSlider: function () {
        // the functionality of the slider is loaded
        const container = document.querySelector(this.config.container);
        const items = Array.from(container.querySelectorAll('.item'));
        this.items = items;
        this.verify();
        this.loadBullets();
    },

    loadBullets: function () {
        // function that loads the bullets
        var self = this;
        // bullet container
        var bulletsContainer = document.createElement('div');
        bulletsContainer.className = "bullets";
        // the list is instantiated
        var ul = document.createElement('ul');
        // the slides are traversed to generate the bullets
        this.items.forEach((e, i) => {
            // the structure of the bullets is created
            var li = document.createElement('li');
            var h4 = document.createElement('h4');
            var p = document.createElement('p');

            h4.innerText = e.dataset.title;
            p.innerText = e.dataset.text;

            if (parseInt(e.dataset.index) == 0) {
                li.classList.add('active');
            }
            // the event that changes the bullet when clicking is created
            li.addEventListener('click', function () {
                self.index = e.dataset.index;
                self.active();
            })
            li.appendChild(h4);
            li.appendChild(p);
            ul.appendChild(li);
            bulletsContainer.appendChild(ul)
        })

        document.querySelector('.slider').appendChild(bulletsContainer);
    },

    verify: function () {
        // Function that verifies the active slide
        var self = this;
        self.active();

        setTimeout(() => {
            if (self.index == self.items.length - 1) {
                self.index = 0;
            } else {
                self.index++;
            }
            self.verify();
        }, parseInt(self.config.time));
    },

    active: function () {
        //function that activates a slide and shows it
        const bullets = document.querySelectorAll('.slider .bullets ul li');
        this.items.forEach((e, i) => {
            if (this.index == i) {
                e.classList.add('active');
            } else {
                e.classList.remove('active');
            }
        });
        // function that activates a bullet and shows it
        bullets.forEach((e, i) => {
            if (this.index == i) {
                e.classList.add('active');
            } else {
                e.classList.remove('active');
            }
        })
    },

    prev: function () {
        // funcion qye cambia el slide hace atras
        if (this.index == 0) {
            this.index = this.items.length - 1;
        } else {
            this.index = this.index - 1;
        }
        this.active();
    },

    next: function () {
        // funcion que cambia el slide hacia delante
        if (this.index == this.items.length - 1) {
            this.index = 0;
        } else {
            this.index = this.index + 1;
        }
        this.active();
    },

    mediaQuery: function (media = "min-width:768px", pixels = 768) {
        // funcion para menajar los media query
        var query;
        if (media === "max-width" || media === "min-width" || media === "max-height" || media === "min-height" &&
            typeof pixels === "number") {
            query = media + ":" + pixels.toString() + 'px';
        }

        if (window.matchMedia(`(${query})`).matches) {
            return true;
        } else {
            return false;
        }
    }
}