import {viewAllInformation,InsertNewDataModel,modelsOfUpdate,modelDelete,modelByGetId} from '../models/wharehouseModels.js'


export const getAll=async (req,resp)=>{
    
    const wharehousesInfo=await viewAllInformation()
     // console.log(wharehousesInfo[0])  //Estoy mirando que me trae con el index 0 [0] entonces desestructuro para que solo me pase un array
     try{
         if(wharehousesInfo){
             resp.json({
                 message: `This is the info`,
                 wharehousesInfo
             })
         }
     }catch(err){
         resp.json({
             message:`something went wrong getting the info${err}`
         })
     }
 }

 export const getById=async(req,resp)=>{
    try {
        const id=findId(req)
    const data= await modelByGetId(id)
        if(!data){
            resp.status(404).send(
                'Info not found'
            )
        }else{resp.status(200).json({
            message:'Look at the info',
            data
        })}
        
    } catch (error) {
        throw new Error(`something went wrong finding the info`,error)
    } 
}

 export const InsertNewDataController=async(req,resp)=>{
    const {name,location,drivers_id,vehicles_id}=req.body
    const viewWarehouse=await InsertNewDataModel(name,location,drivers_id,vehicles_id)
    
    try {
        resp.status(201).json({
            message:"created successfully",
            viewWarehouse
        })
    } catch (error) {
        throw new Error("Something went wrong adding",error)   
    }
}


function findId(req){
    const findId= req.params.id
    return findId
}

export const UpdateById=async(req,resp)=>{
    
    const dataForUpdate={
        name:req.body.name,
        location:req.body.location
    }
    const [[[dataThatUpdate]]]= await modelsOfUpdate(dataForUpdate.name,dataForUpdate.location,findId(req))

    try{
        resp.status(203).json({
            message:"updated successfully",
            dataThatUpdate
        })
    }catch(err){
        throw new Error("It could not be updated",err)

    }
}


export const deleteById=async(req,resp)=>{
    const deleteObject=await modelDelete(findId(req))
    try {
        resp.status(201).json({
         message:'It was deleted',
         deleteObject
         
    })
} catch (error) {
        throw new Error(`It could not be deleted`,error)
    }
   
}