var fila= "<tr>" +
	"<td class='id'></td>" +
	"<td class='foto'></td>" +
	"<td class='price'></td>" +
	"<td class='title'></td>" +
	"<td class='description'></td>" +
	"<td class='category'></td>" +
	"<td class='delOption'></td> " +
	"</tr>";

	var productos=null;
	function codigoCat(catstr) 
	{
		var code="null";
		switch(catstr) {
			case "electronicos":code="c1";break;
			case "joyeria":code="c2";break;
			case "caballeros":code="c3";break;
			case "damas":code="c4";break;
		}
		return code;
	}   
	  
	var orden=0;
	  
	  
	function listarProductos(productos) 
	{
		var precio=document.getElementById("price"); 
		precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
		var num=productos.length;
		var listado=document.getElementById("listado");
		var ids,titles,prices,descriptions,categories,fotos, eliminar;
		var tbody=document.getElementById("tbody"),nfila=0;
		tbody.innerHTML="";
		var catcode;
		for(i=0;i<num;i++) tbody.innerHTML+=fila;
		var tr; 
		ids=document.getElementsByClassName("id");
		titles=document.getElementsByClassName("title");
		descriptions=document.getElementsByClassName("description");
		categories=document.getElementsByClassName("category");   
		fotos=document.getElementsByClassName("foto");   
		prices=document.getElementsByClassName("price");
		eliminar=document.getElementsByClassName("delOption");    
		if(orden===0) {orden=-1;precio.innerHTML="Precio"}
		else
			if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
			else 
				if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	  
	  	listado.style.display="block";
		for(nfila=0;nfila<num;nfila++) 
		{
			ids[nfila].innerHTML=productos[nfila].id;
			titles[nfila].innerHTML=productos[nfila].title;
			descriptions[nfila].innerHTML=productos[nfila].description;
			categories[nfila].innerHTML=productos[nfila].category;
			catcode=codigoCat(productos[nfila].category);
			tr=categories[nfila].parentElement;
			tr.setAttribute("class",catcode);
			prices[nfila].innerHTML="$"+productos[nfila].price;
			fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
			fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
			eliminar[nfila].innerHTML="<button onclick=\""+"deleteProducto("+productos[nfila].id+")"+"\">Eliminar</button>";
		}
	}

function deleteProducto(id) 
{
	var delresult;
	productos = null;
	orden = 0;
	fetch(`https://retoolapi.dev/AJkGZn/productos${id}`, {
			method: "DELETE"
		})
		.then(response => response.json())
		.then(data => {delresult = data;obtenerProductos()});
}	

function obtenerProductos() {
	  fetch('https://retoolapi.dev/AJkGZn/productos')
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(
					function(producto)
					{
						producto.price = parseFloat(producto.price)
					}
				);
				listarProductos(data)})
}

var Ititulo = null;
var Iprecio = null;
var Idescripcion = null;
var Iimagen = null;
var Icategoria = null;

function ingresarProducto()
{
	Ititulo = document.getElementById("Ingresotitulo").value;
	Iprecio = document.getElementById("Ingresoprecio").value;
	Idescripcion = document.getElementById ("Ingresodescripcion").value;
	Iimagen =document.getElementById ("Ingresoimagen").value;
	Icategoria = document.getElementById ("Ingresocategoria").value;
	//alert(Ititulo + " " + Iprecio + " " + Idescripcion + " "+ Icategoria + " " + Iimagen);
	
	productos = null;
	orden = 0;
	
	var agregar = {image: Iimagen,price: Iprecio,title: Ititulo,category: Icategoria,description: Idescripcion}
	var resultado;
	fetch("https://api-generator.retool.com/eI9mm6/productos",
		{	method: "POST",
			body: JSON.stringify(agregar),
			headers: {'Accept': 'application/json','Content-Type': 'application/json;charset=UTF-8'}
		}).then(response=>response.json()).then(data=>{resultado=data;alert("Registro con identificador: "+resultado.id);obtenerProductos()});
	//Aunque no comprendo como seguir codigo despues del fetch
	//pero si en las ultimas lineas ejecuto lo que deseo, se puede mostrar
}

function ordenarDesc(p_array_json, p_key) 
{
   	p_array_json.sort(function (a, b){if(a[p_key] > b[p_key]) return -1; if(a[p_key] < b[p_key]) return 1;return 0;});
}

function ordenarAsc(p_array_json, p_key) 
{
   	p_array_json.sort(function (a, b) {if(a[p_key] > b[p_key]) return 1;if(a[p_key] < b[p_key]) return -1;return 0;});
}