const charactersAPI = new APIHandler("http://localhost:8000");
const url= "http://localhost:8000/characters"



$(document).ready(() => {
  document.getElementById('fetch-all').onclick = function () {
    fetch(url)
.then(res=>{
  if(!res.ok) throw new Error ();
  return res .json();
})
.then(data=>{
  console.log(data)
})
.catch(err => console.log(err));

  }

  document.getElementById('fetch-one').onclick = function () {
    let id = document.getElementById('getid').value;
    fetch(url+"/"+id)
    .then(res=>{
      if(!res.ok) throw new Error ();
      return res .json();
    })
    .then(data=>{
      let edit=document.getElementById('mos');
      edit.value=data.id;
      let edit1=document.getElementById('mos1');
      edit1.value=data.name;
      let edit2=document.getElementById('mos2');
      edit2.value=data.occupation;
      let edit3=document.getElementById('mos3');
      edit3.value=data.weapon;
      let edit4=document.getElementById('mos4');
      edit4.checked=data.cartoon;

    
      console.log(data.cartoon);
    })
    .catch(err => console.log(err));

  
      }
    
    
    

  

  document.getElementById('delete-one').onclick = function () {
    let id = document.getElementById('del').value;
    fetch(url+"/"+id, {
      
             method:'DELETE',
             headers: {
                 "Content-Type":"application/json",
             },
             
           })
       .then(res=>{
           if(!res.ok) return Promise.reject(res.statusText);
           return res.json()
       })
       .then(data=>{
           console.log("se ha borado");
         })
      .catch(err=> console.log(err));


  }

  document.getElementById('edit-character-form').onsubmit = function (e) {
    e.preventDefault();
    let id= document.getElementById('mos');
   let nombre= document.getElementById('mos1').value;
   let occupation= document.getElementById('mos2').value;
   let weapon= document.getElementById('mos3').value;
   let cartoon= document.getElementById('mos4').checked;
   let objet={
     id: id,
     nombre: nombre,
     occupation: occupation,
     weapon: weapon,
     cartoon: cartoon
   }
   fetch(url+"/"+id, {
  
            method:'PATCH',
            headers: {
                "Content-Type":"application/json",
            }
          })
    
      .then(res=>{
          if(!res.ok) return Promise.reject(res.statusText);
          return res.json()
      })
      .then(data=>{
          console.log(data);
        })
    .catch(err=> console.log(err));
  }

  document.getElementById('new-character-form').onsubmit = function (e) {
    e.preventDefault();
    let nombre= document.getElementById('name').value;
    let occupation= document.getElementById('occupation').value;
    let weapon= document.getElementById('weapon').value;
    //let cartoon= document.getElementById('cartoon').checked;

    fetch(url, {
      
              method:'POST',
              headers: {
                  "Content-Type":"application/json",
              }
            })
      
        .then(res=>{
            if(!res.ok) return Promise.reject(res.statusText);
            res.json()
            res.name=nombre;
            return res
        })
        .then(data=>{
            
            console.log(data);
          })
      .catch(err=> console.log(err));

  }
})



