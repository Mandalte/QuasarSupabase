<template>
  <div class="q-pa-md">
    <q-table
      title="Categorias"
      :rows="categorias"
      :columns="columns"
      color="primary"
      row-key="index"
      class="q-ma-sm"
      label="Show Loading"
    >
      <template v-slot:top-right>
        <div class="q-gutter-x-sm">
          <q-btn
            v-if="$q.platform.is.desktop"
            outline
            icon="mdi-plus"
            label="Nova"
            color="primary"  
            no-caps
            to="/register-category"
          />

          <q-btn
            outline
            dense
            color="primary"
            icon-right="archive" 
            no-caps
            @click="exportTable"
          />
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
      <q-td :props="props" class="q-gutter-x-sm">
        <q-btn color="info" icon="mdi-pencil-outline" :to="{name:'register-category',params:{id:props.row.id}}" dense>
          <q-tooltip
            transition-show="rotate"
            transition-hide="rotate"
          >
            Edit
          </q-tooltip>
        </q-btn>
        <q-btn color="negative" icon="mdi-delete-outline" @Click="handleDeletarCategoria(props.row)" dense>
           <q-tooltip
            transition-show="rotate"
            transition-hide="rotate"
            dense
          >
            Remove
          </q-tooltip>
        </q-btn>
      </q-td>
    </template>
    </q-table>
  </div>
  <q-page-sticky to="/register-category"   
  position="bottom-right" 
  :offset="[18, 18]">
    <q-btn
      v-if="$q.platform.is.mobile"
      :to="{name:'register-category'}"
      fab
      icon="add"
      color="primary"
    />
  </q-page-sticky>
</template>

<script>
import { exportFile, useQuasar } from 'quasar'
import { defineComponent, ref, onMounted} from 'vue'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/useNotify'
import { useRouter } from 'vue-router'

const columns = [
  {
    name: 'index',
    required: true,
    label: '#',
    field: 'index',
    align: 'left',
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
     field: row => row.name,
    // format: val => `${val}`,
  },
   {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'right',
     field: row => row.actions,
    // format: val => `${val}`,
  }
 ]

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default defineComponent ({
  name:'ListCategoryPage',
  setup () {
    const $q = useQuasar()
    const {list,remove} = useApi()
    const {semSucesso,sucesso} = useNotify()
    const categorias = ref([])
    const router = useRouter()
    const table = 'category'

    const handleListCategorias = async()=>{
      try{
        categorias.value = await list(table)
        categorias.value.forEach((row, index) => {
          row.index = index
        })
        $q.loading.hide()
      }catch(error){
          $q.loading.hide()
          semSucesso(error.message)
      }
    }

    onMounted(()=>{
      $q.loading.show()
      handleListCategorias()
    })

    const handleDeletarCategoria = (categoria)=>{

       $q.dialog({
            title:"Atecao",
            message:`Desejas deletar a categoria ${categoria.name}?`,
            cancel:true,
            persistent: true
          }).onOk(async()=>{
              try{
                  await remove(table,categoria.id)
                  categorias.value.splice(categorias.value.indexOf(categoria),1)
                  sucesso(`Categoria ${categoria.name} deletada`)
              }catch(error){
                semSucesso('Falha na remocao da categoria '+error.message)
              }
          })
    }

    return {
      columns,
      handleDeletarCategoria,
      categorias,
      router,
      exportTable () {
        // naive encoding to csv format
        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          rows.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
            col.format,
            row
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      }
    }
  }
})
</script>
