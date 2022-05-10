import { createClient } from '@supabase/supabase-js'
import { event } from 'quasar'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange((event,session) => {
    const { user } = useAuthUser()
    user.value = session?.user || null
})

console.log('init supabase',supabase)

export default function useSupabase(){
    return {supabase}
}