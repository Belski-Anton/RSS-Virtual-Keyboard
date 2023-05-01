import './style.css';

let elem = document.createElement('h1');
elem.className = 'title'
elem.textContent = `RSS Виртуальная клавиатура`;
document.body.append(elem)

let textarea = document.createElement('textarea');
textarea.className = 'textarea';
document.body.append(textarea);

let keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.append(keyboard);

let paragraph_1 = document.createElement('p');
paragraph_1.className = 'description';
paragraph_1.textContent = 'Клавиатура создана в операционной системе Windows';
document.body.append(paragraph_1);


let paragraph_2 = document.createElement('p');
paragraph_2.className = 'language';
paragraph_2.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';
document.body.append(paragraph_2);



const arrKeysRu = [
   ['ё','1','2','3','4','5','6','7','8','9','0','-','+','Backspace'],
   ['Tab','й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\\','Del'],
   ['CapsLock','ф','ы','в','а','п','р','о','л','д','ж','э','Enter'],
   ['Shift','я','ч','с','м','и','т','ь','б','ю','ю','▲','Shift'],
   ['Ctrl','Win','Alt','','Alt','◄','▼','►','Ctrl'],
]

const arrKeysEn = [
   ['~','1','2','3','4','5','6','7','8','9','0','-','+','Backspace'],
   ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del'],
   ['CapsLock','a','s','d','f','g','h','j','k','l',';','\'','Enter'],
   ['Shift','z','x','c','v','b','n','m',',','.','/','▲','Shift'],
   ['Ctrl','Win','Alt','','Alt','◄','▼','►','Ctrl'],
]

const compareArr =
 ['Backspace','Tab','Del','CapsLock','Enter','Shift','▲','Ctrl','Win','Alt','◄','▼','►' ,'','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']

 textarea.setAttribute('autofocus', 'autofocus');
 document.onclick = () => {
   textarea.focus();
 };


function renderKeys(arrKeys){
   arrKeys.forEach(el=>{
      let arr = document.createElement('div');
      arr.className = 'row'
      el.forEach((item,idx)=>{
         let arrKey = document.createElement('span');
         arrKey.className='key'
         arrKey.innerHTML = item;
         arr.append(arrKey);
        if(compareArr.includes(item)){
         if(item === 'Backspace' || item === 'CapsLock'){
            arrKey.className = 'key bg-color w-100';
         } else if(item ==='Tab'||item ==='Del'){
            arrKey.className = 'key bg-color w-47';
         } else if(item ==='Enter'){
            arrKey.className = 'key bg-color w-86';
         }else if(item ==='Shift'){
           if(idx === 0){
            arrKey.className = 'key bg-color w-100';
           }else{
            arrKey.className = 'key bg-color w-86';
           }
         } else if(!item){
            arrKey.className = 'key  w-360';
         }
         
         else{
         arrKey.className = 'key bg-color';
         }
        }
      })
      keyboard.append(arr)
   })
}

renderKeys(arrKeysEn);

let allKeys = document.querySelectorAll('.key');
 let isUpperCase = false
allKeys.forEach(elem =>{
   elem.addEventListener('mouseleave',()=>{ 
      elem.classList.remove('active')
   })
   elem.addEventListener('click',function(){
      elem.classList.add('active')
      if(!compareArr.includes(elem.textContent)){
      textarea.value += elem.textContent;
      }else{
         if(!elem.textContent){
            textarea.value += ' ';
         }else if(elem.textContent === 'Enter'){
            textarea.value += '\n';
         }else if(elem.textContent === 'Backspace'){
           const position=textarea.selectionStart;
           if(position !== 0){
            const value =  textarea.value;
            textarea.value = value.slice(0,position-1) + value.slice(position);
            textarea.selectionStart = position-1;
            textarea.selectionEnd = position-1;
           }
          
         } 
         else if(elem.textContent === 'Del'){
            const position=textarea.selectionStart;
            const value =  textarea.value;
            textarea.value = value.slice(0,position) + value.slice(position + 1);
            textarea.selectionStart = position;
            textarea.selectionEnd = position;
           
          
          
         }
          else if(elem.textContent === '◄'){
            textarea.value += '◄';
          }else if(elem.textContent === '►'){
            textarea.value += '►';
          }else if(elem.textContent === '▲'){
            textarea.value += '▲';
          }else if(elem.textContent === '▼'){
            textarea.value += '▼';
          }

         else if(elem.textContent === 'CapsLock'){
            isUpperCase = !isUpperCase
            for(let key of allKeys){
               if(key.textContent.length<2){
                  if(isUpperCase){
                  key.innerHTML = key.innerHTML.toUpperCase();
                  }else{
                     key.innerHTML = key.innerHTML.toLowerCase(); 
                  }
               }
            }
         }
      }
   })
})




document.addEventListener('keydown', function(event){
   console.log(event)
   let currentKey = event.key
   if(!compareArr.includes(currentKey) || !currentKey){
      // textarea.value = currentKey
   } else if(currentKey ==='Tab'){
      event.preventDefault();
      textarea.value += '  ';
   }
   else if(currentKey === 'ArrowUp'){
      // event.preventDefault();
      textarea.value += '▲';  
   }
   else if(currentKey === 'ArrowDown'){
      // event.preventDefault();
      textarea.value += '▼';  
   }
   else if(currentKey === 'ArrowLeft'){
      // event.preventDefault();
      textarea.value += '◄';  
   }
   else if(currentKey === 'ArrowRight'){
      // event.preventDefault();
      textarea.value += '►';  
   }
   
});

