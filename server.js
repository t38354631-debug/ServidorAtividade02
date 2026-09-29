const express = require("express");
const pedidos = require("../dados.json");


//todos os pedidos
// o post deu certo
const mostrarPedidos = (req, res ) => {
    res.send(pedidos)
}

//pedido espe
//pedido espesifico deu certo
const mostrarP = (req, res ) => {
    const id = req.params.id;
    pedidos.forEach((item) => {
        if(item.id == id ) {
            res.send(item);
        }res.send("pedido nao achado")
    })

}

//o post deu certo
const postarNovo = (req, res ) => {
  
   if (req.body.id) {
      const id= pedidos.lenght + 1;
      req.body.id =
    res.send("pedido recebido com sucesso!");
    pedidos.push(req.body.id)

   } else {
    res.send("erro ao realizar pedido!");
    
   }
}

//put esta funcionando
const atualizarPedidos = (req, res ) => {
    const id = req.params.id;
    const dados = req.body;

    pedidos.forEach((pedido) => {
        if(pedido.id == id) {
            pedido.item = dados.item;
            pedido.local = dados.local;
            pedido.dataRegistro = dados.dataRegistro;
            pedido.valor = dados.valor;
            pedido.patrimonio = dados.patrimonio;
        }
    });

    res.send("pedido atualizado com sucesso");
}

const excluirPedido = (req, res) => {

    const id = req.params.id;
    pedidos.forEach((pedido, indice) => {
        if(pedido.id == id){
            pedidos.splice(indice, 1);
        }
    
    });    
 res.send("pedido excluido")
}
    


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const porta = 4000;

/*
app.get("/pedido/:id", (req, res ) => {
    const pedidosId = parseInt(req.params.id, 1);
    const pedidoP = pedidos.find(p =>p.id === id );
    if (!pedidoP){
        return res.status(404).json ({
            erro: "pedido nao encontrado"});
            res.json(pedidoP);
    }

    
});
*/


app.get("/", mostrarPedidos);
app.get("/:id", mostrarP)
app.post("/", postarNovo);
app.put("/:id", atualizarPedidos);
app.delete("/:id", excluirPedido);

app.listen(porta, () => {
    console.log("servidor funcionando!")
});