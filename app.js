// import the style for bundling
import './app.scss'

class Bar {
    constructor(obj) {
        let {id, data, speed = 1, direction = 'left-right'} = obj;
        this.id = id;
        this.el = document.querySelector(id);
        this.data = data;
        this.speed = speed;
        this.direction = direction;
        this.startValue = 0;
        this.runingState = true;
        this.init()
    };



    init() {
        if(!typeof this.data === 'object' && this.data instanceof Array) {
            throw new Error('the first input - the data must be an array ');
        }

        // detect page width and height
        this.pageWidth = document.body.clientWidth;
        this.pageHeight = document.body.clientHeight;

        // watch browser resize event;
        this.watchBrowserResize();

        // create the bar content
        var El = document.createDocumentFragment();
        // set the bar-id attribute for later slideout page eventlistener use
        var conditions = {
            'left-right': 'first',
            'up-down': 'first',
            'down-up': 'last',
            'right-left': 'last'
        };
        var noteWord = conditions[this.direction];
        this.note = noteWord
        this.data.forEach((i, index)=> {
            // add the bar-id to the element attribute
            let note;
            if (noteWord === 'first') {
                note = (index === 0) ? noteWord : '';
            }else {
                note = (index === this.data.length - 1) ? noteWord : '';
            }

            var classNames = 'each-news'
            classNames = index % 2 === 0 ? classNames + ' single' : classNames + ' double';

            // this.el.style.transform = this
            // create
            El.appendChild(this.createElement(i.text, 'p', classNames, note, i))
        })
        
        // hide the element initially;
        this.el.style.opacity = '0';

        // append the final result into the Node in the page;
        this.el.setAttribute('class', 'flex bar');
        this.el.appendChild(El);
        // detect wehther the dynamically loaded component is fully rendered on the page
        setTimeout(()=> {
            this.el.style.opacity = '1';
        }, 0)

        // set the start position of the bar
        document.body.onload = ()=> {

            // get the length of the whole bar
            let allTextNodeArray = this.el.children;
            let allLength = Array.prototype.reduce.call(allTextNodeArray, (sum, currentNode)=> {
                return sum + currentNode.getClientRects()[0].width
            }, 0)

            // set startValue depends on the direction
            var conditions = {
                'left-right': - allLength + this.el.clientWidth,
                'up-down': - this.el.clientHeight,
                'down-up': this.el.clientHeight + this.pageHeight,
                'right-left': this.pageWidth,
            };
            this.startValue = conditions[this.direction];
            
            // condition for the first condition - 'left-right'
            // this.startValue = this.el.clientWidth < this.pageWidth ? this.el.clientWidth : this.el.pageWidth
        }

        // start running the bar
        this.running();
    };
    createElement(content, element, className, note, data){
        let result = document.createElement(element);
        className ? result.setAttribute('class', className) : undefined;
        note ? result.setAttribute('bar-id', note) : undefined;
        data.bg && typeof data.bg === 'string' ? result.style.backgroundColor = data.bg : undefined;
        data.color && typeof data.color === 'string' ? result.style.color = data.color : undefined;
        result.textContent = content;
        return result;
    };
    running() {
        var conditions = {
            'left-right': 'translateX({value}px)',
            'up-down': 'translateY({value}px)',
            'down-up': 'translateY(-{value}px)',
            'right-left': 'translateX({value}px)'
        };
        // return false if the direction declaration is not correct
        if (!conditions[this.direction]) { throw new Error('Declare the right direction please')};

        // get the side of calculation for watch and delete function to use
        var side = this.direction.split('-')[0]

        // move the bar based on direction
        let moveBar = ()=> {
            // console.log(this.startValue)
            if(side === 'left' && this.running) {
                this.startValue += this.speed
            } else if (side === 'right' && this.running) {
                // @TODO - Not working, should fix - (probably because the bar is the whole line while content is not sufficient)
                this.startValue -= this.speed
                // console.log(this.startValue)
            }
            
            let value = conditions[this.direction].replace('{value}', this.startValue)
            this.el.style.transform = value;
            this.watchAndDelete(side);
            window.requestAnimationFrame(moveBar)
        }
        moveBar()

        // start watching the bar and detection
        this.watchAndDelete()
    };
    watchAndDelete(sideToWatch){
        let el = document.querySelector('[bar-id=' + "'" + this.note + "'" +  ']')
        var distance = el.getClientRects()[0][sideToWatch];
        // console.log(el.getClientRects()[0].right)
        // console.log(this.el.clientWidth)
        if(distance >= this.pageWidth) {
            this.startValue = - this.el.clientWidth;
            // this.el.style.transform = `translateX(-${this.pageWidth + this.el.clientWidth}px)`
            // this.el.parentNode.removeChild(this.el);
        }
        // console.log(this.pageWidth + this.el.clientWidth)
        
    };
    watchBrowserResize() {
        window.addEventListener('resize', ()=> {
            this.pageWidth = document.body.clientWidth;
            this.pageHeight = document.body.clientHeight
        })
    };
    stop(){
        this.running = false;
    }
    start(){
        this.running = true;
    }
}

window.Bar = Bar