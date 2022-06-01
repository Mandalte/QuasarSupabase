import useSupabase from "src/boot/supabase"
import useAuthUser from "./UseAuthUser"
import {v4 as uuid4} from 'uuid'

export default function useApi(){

    const {supabase} = useSupabase()
    const {user} = useAuthUser()

    const list = async(table)=>{
        const {error,data} = await supabase
        .from(table)
        .select('*')
        if(error) throw error
        return data
    }

    const getById = async(table,id) =>{
        const {error,data} = await supabase
        .from(table)
        .select('*')
        .eq('id',id)
        if(error) throw error
        return data[0]
    }

    const post = async (table,form) =>{
        const {error,data} = await supabase
        .from(table)
        .insert([
            {
                ...form,
                user_id: user.value.id
            }
        ])
        if(error) throw error
        return data
    }
    const update = async(table,form) =>{
        const{error,data} = await supabase
        .from(table)
        .update(form)
        .match({id:form.id})
        if(error) throw error
        return data
    }

    const remove = async(table,id)=>{
        const {error,data} = await supabase
        .from(table)
        .delete()
        .match({id})
        if(error) throw error
        return data
    }

    const uploadingImg = async(img,storage)=>{
      const imgName = uuid4()
      const {error} =

        supabase
        .storage
        .from(storage)
        .upload(imgName,img,{
          cacheControl:'3600',
          upsert:false
        })

        const url = await getImgUrl(imgName,storage)

        if(error) throw error
        return url
    }

    const getImgUrl = async(imgName,storage)=>{
      const { publicURL, error } = supabase
      .storage
      .from(storage)
      .getPublicUrl(imgName)

      if(error) throw error
      return publicURL
    }

    return{
        list,
        getById,
        post,
        update,
        remove,
        uploadingImg
    }
}
