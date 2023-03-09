import { sample_foods, sample_tags } from "../data";
import {Router} from 'express';
const router = Router();
router.get("/",(req,res)=>{
    res.send(sample_foods)
})
router.get("/tags",(req,res)=>{
    res.send(sample_tags);
})
router.get("/:foodId",(req,res)=>{

    const id = req.params.foodId;
    const food = sample_foods.find((food)=>food.id === id)
    res.send(food)
})


router.get("/search/:searchTerm",(req,res)=>{

    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter((food)=>food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods)
})



router.get("/tag/:tagName",(req,res)=>{
const tagName = req.params.tagName;
const foods = sample_foods.filter((food)=>food.tags.includes(tagName));

    res.send(foods)
})

export default router;
