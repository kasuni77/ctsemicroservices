//Use express router, request
const router = require("express").Router();
const { request } = require("express");
//use Inventory model
let Inventory = require("../model/inventorymodel");

//add data to order table
//Post request
//http://localhost:8070/inventory/add
router.route("/add").post((req,res)=>{
    const itemName = req.body.itemName;
    const price = req.body.price;
    const description = req.body.description;
    const count = req.body.count;

    const newInventory = new Inventory({
        itemName,
        price,
        description,
        count
    })

    newInventory.save().then(()=>{
        res.json("Inventory Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//Get all Inventory
//Get Request
router.route("/").get((req,res)=>{
    Inventory.find().then((inventory)=>{
        res.json(inventory)
    }).catch((err)=>{
        console.log(err)
    })
})

//update a Inventory by id
//Put Request
router.route("/update/:id").put(async (req,res)=>{
    let inventoryId = req.params.id;
    const {itemName,price,description,count} = req.body;
    const updateInventory = {
        itemName,
        price,
        description,
        count
    }

    const update = await Inventory.findByIdAndUpdate(inventoryId,updateInventory).then(()=>{
        res.status(200).send({status: "Inventory Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//delete Inventory by id
//Delete Request
router.route("/delete/:id").delete(async (req, res)=>{
    let inventoryId = req.params.id;

    await Inventory.findByIdAndDelete(inventoryId).then(()=>{
        res.status(200).send({status: "inventory deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//find one of the inventory by id
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    Inventory.findById(id).then((inventory)=>{
        res.json(inventory)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;