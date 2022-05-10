import { useQuasar } from "quasar"

export default function useNotify(){

    const $q = useQuasar()

    const sucesso = (message) => {
        $q.notify({
            message: message || "Sucesso",
            type:'positive'
        })
    }

    const semSucesso = (message) => {
        $q.notify({
            message: message || "Falha",
            type:'negative'
        })
    }

    const aviso = (message) => {
        $q.notify({
            message: message,
            type:'warning'
        })
    }

    const info = (message) =>{
        $q.notify({
            message:message
        })
    }

    return{
        sucesso,
        semSucesso,
        aviso,
        info
    }

}