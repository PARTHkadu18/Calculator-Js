const input = document.querySelector('#inpt')
const num = document.querySelectorAll('.number')
const ac=document.querySelector('#ac');
const bracket=document.querySelector('#bracket')
const dot=document.querySelector('#dot')
const back=document.querySelector('#back')
const ans=document.querySelector('#equal')
let isDot=true;
let isDisabled=false;
let numBracket=0;

num.forEach(button=>{
    button.addEventListener('click',()=>{
        if(isDisabled)return;
        const val = button.textContent;
        if(val==='+' || val==='-' || val==='/' || val==='*' || val==='%'){
            isDot=true;
        }
        input.value+=val;
        
        console.log(input.value);
    })
})

input.addEventListener('keydown',(e)=>{
    if(isDisabled){
        e.preventDefault();
        return;
    }
    const key=e.key;
    if (
        key === 'Backspace' ||
        key === 'Delete' ||
        key === 'ArrowLeft' ||
        key === 'ArrowRight' ||
        key === '+' ||
        key === '-' ||
        key === '/' ||
        key === '*' ||
        key === '%' 
      ) {
        return;
      }

      // Prevent non-numeric keys
     else if (!/^\d$/.test(key)) {
        e.preventDefault();
    if(key==='1'){
        input.value+='1';
    }
    else if(key==='2'){
        input.value+='2';
    }
    else if(key==='3'){
        input.value+='3';
    }
    else if(key==='4'){
        input.value+='4';
    }
    else if(key==='5'){
        input.value+='5';
    }
    else if(key==='6'){
        input.value+='6';
    }
    else if(key==='7'){
        input.value+='7';
    }
    else if(key==='8'){
        input.value+='8';
    }
    else if(key==='9'){
        input.value+='9';
    }
    else if(key==='0'){
        input.value+='0';
    }
    else if(key==='('){
        input.value+='('
        numBracket++;
    }
    else if(key===')'){
        input.value+=')'
        numBracket--;
    }
}
})

ac.addEventListener('click',()=>{
    input.value='';
    isDisabled=false;
})

bracket.addEventListener('click',() =>{
    const val=input.value;
    const len=val.length;

    if(val===''){
        input.value+='(';
        numBracket++;
    }
    else if(val.charAt(len-1)==='+' || val.charAt(len-1)==='-' || val.charAt(len-1)==='*' || val.charAt(len-1)==='/' || val.charAt(len-1)==='%' || val.charAt(len-1)==='('){
        input.value+='('
        numBracket++;
    }
    else if(val.charAt(len-1)>='0' && val.charAt(len-1)<='9' && numBracket!=0){
        input.value+=')'
        numBracket--;
    }
})

dot.addEventListener('click',()=>{
    if(isDot && !isDisabled){
        isDot=false;
        if(input.value===''){            
            input.value+='.';
        }
        else if(input.value.charAt(input.value.length-1)==='.'){
            console.log('');
        }
        else{
            input.value+='.';
        }
    }
})

back.addEventListener('click', ()=>{
    if(isDisabled){
        return;
    }
    let currentValue = input.value;

    // Get the cursor position
    const cursorPos = input.selectionStart;
    console.log(cursorPos);
    

    // If cursor is not at the beginning
    if (cursorPos > 0) {
        // Remove the character before the cursor
        input.value =
            currentValue.slice(0, cursorPos - 1) + currentValue.slice(cursorPos);

        // Move the cursor one step back
        input.setSelectionRange(cursorPos - 1, cursorPos - 1);
    }
    input.focus();
}
)


class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }

    pop() {
        this.items.pop();
    }

    top() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

function isdigit(c){
    if((c>='0' && c<='9') || c==='.')return true;
    return false;
}
function isOperator(c){
    if(c==='+' || c==='-' || c==='/' || c==='*' || c==='%'){
        return true;
    }
    return false;
}

function preci(c){
    if(c==='+' || c==='-')return 1;
    if(c==='*' || c==='/' || c==='%')return 2;
    return 0;
}
function solve(a1,b1,c){
    let a=Number(a1);
    let b=Number(b1);
    if(c==='+')return a+b;
    else if(c==='-')return a-b;
    else if(c==='/')return a/b;
    else if(c==='*')return a*b;
    else if(c==='%')return a%b;
}

function infixToPost(str){
    const s=new Stack();
    const n=str.length;
    let postFix='';

    for(let i=0; i<n; i++){
        const c=str.charAt(i);

        if(isdigit(c) || c==='-' &&(i==0 || str[i-1]==='(')){
            postFix+=c;
            while(i+1<n && isdigit(str.charAt(i+1))){
                postFix+=str.charAt(++i);
            }
            postFix+=' ';
        }
        else if(c==='('){
            s.push('(')
        }
        else if(c===')'){
            while(!s.isEmpty() && s.top()!='('){
                postFix+=s.top();
                postFix+=' ';
                s.pop();
            }
            s.pop();
        }
        else if(isOperator(c)){
            while(!s.isEmpty() && preci(s.top())>=preci(c)){
                postFix+=s.top();
                postFix+=' ';
                s.pop();
            }
            s.push(c);
        }
    }
    while(!s.isEmpty()){
        postFix+=s.top();
        postFix+=' ';
        s.pop();
    }
    return postFix;
}

function evaluate(infix){
    const postfix=infixToPost(infix)
    const s=new Stack();
    let eval='';
    const n=postfix.length;
    for(let i=0; i<n; i++){
        const c=postfix.charAt(i);

        if(isdigit(c) || (c=='-' &&(i+1<n && isdigit(postfix.charAt(i+1))))){
            eval='';
            eval+=c;
            while(i+1<n && isdigit((postfix.charAt(i+1)))){
                eval+=postfix.charAt(++i);
            }
            s.push(parseFloat(eval));
        }
        else if(isOperator(c)){
            let b=Number(s.top()); s.pop(); 
            let a=Number(s.top()); s.pop();
            s.push(solve(a,b,c));
        }
    }
    return s.top();
}


ans.addEventListener('click',()=>{
    if(numBracket!=0){
        input.value='Syntax error'
        numBracket=0;
    }
    else{
        try{
            const v=evaluate(input.value);
            console.log(v);
            
            if(isNaN(v) || typeof v===undefined){
                input.value='Syntax error';
                isDisabled=true;
            }
            else{
                input.value=v;
            }
        }
        catch(error){
            input.value='Syntax error';
            isDisabled=true;
        }
    }
})
