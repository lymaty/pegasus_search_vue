<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="search"
          class="search_name"
          size="mini"
          placeholder="输入姓名查询">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="text"
          @click="onSearch()"
          class="el-icon-search">查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          class="el-icon-refresh"
          type="text"
          @click="refreshData">刷新
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          class="el-icon-circle-plus-outline"
          type="text"
          @click="dialogVisible = true">添加
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" highlight-current-row border style="width: 100%">
      <!--      <el-table-column width="65px" align="center" label="序号" type="index" :index="table_index">
              <span >{{scope.index}}</span>
            </el-table-column>-->
      <!-- //scope.row代表当前对应行-->
      <el-table-column
        label="id" v-if="false">
        <template slot-scope="scope" >
          <span >{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <p>标题: {{ scope.row.title }}</p>
            <p>内容: {{ scope.row.content }}</p>
            <p>姓名: {{ scope.row.name }}</p>
            <p>作者: {{ scope.row.author }}</p>
            <p>版本号: {{ scope.row.last_version }}</p>
            <div slot="reference" class="name-wrapper">
              <el-button type="text">{{ scope.row.content }}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="版本号">
        <template slot-scope="scope">
          <span>{{ scope.row.last_version }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
      <el-dialog
        title="编辑/添加"
        :append-to-body='true'
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <el-input type="hidden" v-model="ruleForm.Id"/>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="last_version">
          <el-input v-model="ruleForm.last_version"></el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="addTitle()" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>
    </el-form>
    <!--修改-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
      <el-dialog
        title="编辑/修改"
        :append-to-body='true'
        :visible.sync="dialogUpdate"
        width="80%"
        :before-close="handleClose">
        <el-form-item label="ID" prop="title">
          <el-input v-model="ruleForm.id" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="last_version">
          <el-input v-model="ruleForm.last_version"></el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()" size="medium">取 消</el-button>
            <el-button @click="updateTitle()" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>
    </el-form>
    <br>
    <div class="pages">
      <el-pagination
        background
        :disabled = "disablePage"
        :current-page.sync="currentPage"
        small
        layout="total, sizes, prev, pager, next"

        :page-size="pageSize"
        :total="totalCount"
        @size-change="sizeChange"
        :page-sizes="[10,20,30,40]"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        ruleForm: {
          id: '',
          title: '',
          content:'',
          name: '',
          author:'',
          last_version:''
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 2, message: '长度大于 2个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 2, message: '长度大于 2 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入姓名作者', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          last_version: [
            { required: true, message: '请输入版本号', trigger: 'blur' },
            { min: 1, message: '长度大于 1 个字符', trigger: 'blur' }
          ],
        },
        tableData: [
        ],
        search: '',
        dialogVisible: false,//添加
        dialogUpdate: false,//修改
        currentPage: 1,//当前页
        disablePage: false,
        pageSize:10,
        keyword:null,
        totalCount:0,//总条数
        totalPage:0,//总页数
        prevPage:0,//上一页
        nextPage:0,//下一页*
        start:0
      }

    },
    mounted(){
      this.init()//页面内初始加载就调用分页函数
    },
    methods: {
      //分页序号自增
      table_index(index){
        //currentPage当前页。totalCount是总数据
        return (this.tableData.currentPage-1) * this.tableData.totalCount + index + 1
      },

      //编辑
      handleEdit(index, row) {
        console.log(row);
        this.dialogUpdate = true;
        this.ruleForm = Object.assign({}, row); //这句是关键！！！
      },
      handleDelete(index, row) {
        console.log(PegasusDemo, row);
        this.$confirm('删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let postData = this.qs.stringify({
            Id: row.Id,
          });
          this.axios({
            method: 'post',
            url:'/deleteById',
            data:postData
          }).then(response =>
          {
            this.getPages();
            this.currentPage = 1;
            this.axios.post('/getAllByIndex',{currentPage: this.currentPage,
              pageSize:this.pageSize}
            ).then(response =>
            {
              this.tableData = response.data;
            }).catch(error =>
            {
              console.log(error);
            });
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            console.log(response);
          }).catch(error =>
          {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 每页显示多少条数据
      sizeChange(val) {
        this.pageSize = val;
        this.handleCurrentChange();
      },
      //分页
      handleCurrentChange() {
        console.log(`当前页: ${this.currentPage}`);
        let postData = this.qs.stringify({
          currentPage: this.currentPage,
          pageSize:this.pageSize
        });
        this.axios({
          method: 'post',
          url:'/getAllByIndex',
          data:postData
        }).then(response =>
        {
          this.tableData = response.data;
        }).catch(error =>
        {
          console.log(error);
        });
      },
      cancel() {
        this.dialogUpdate = false;
        this.dialogVisible = false;
        this.emptyTitleData();
      },
      emptyTitleData(){
        this.ruleForm = {
          name: '',
          title: '',
          author: '',
          last_version: '',
        }
      },
      addTitle() {
        let postData = this.qs.stringify({
          title: this.ruleForm.title,
          content: this.ruleForm.content,
          name: this.ruleForm.name,
          author: this.ruleForm.author,
          last_version: this.ruleForm.last_version,
        });
        this.axios({
          method: 'post',
          url:'/insertOrUpdate',
          data:postData
        }).then(response =>
        {
          this.axios.post('/getAllByIndex',{currentPage: this.currentPage,
            pageSize:this.pageSize}
          ).then(response =>
          {
            this.tableData = response.data;
            this.currentPage = 1;
            this.$message({
              type: 'success',
              message: '已添加!'
            });
          }).catch(error =>
          {
            console.log(error);
          });
          this.getPages();
          this.dialogVisible = false
          console.log(response);
        }).catch(error =>
        {
          console.log(error);
        });
      },
      updateTitle() {

        let postData = this.qs.stringify({
          Id: this.ruleForm.Id,
          title: this.ruleForm.title,
          content: this.ruleForm.content,
          name: this.ruleForm.name,
          author: this.ruleForm.author,
          last_version: this.ruleForm.last_version,
        });
        this.axios({
          method: 'post',
          url:'/insertOrUpdate',
          data:postData
        }).then(response =>
        {
          this.handleCurrentChange();
          this.cancel();
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          console.log(response);
        }).catch(error =>
        {
          this.$message({
            type: 'success',
            message: '更新失败!'
          });
          console.log(error);
        });
      },
      onSearch() {
        let postData = this.qs.stringify({
          keyword: this.search,
          currentPage: this.currentPage,
          pageSize:this.pageSize
        });
        this.axios({
          method: 'post',
          url: '/search',
          data: postData
        }).then(response =>
        {
          this.tableData = response.data;
          this.disablePage = true;
        }).catch(error =>
        {
          console.log(error);
        });
      },
      //获取总条数
      getPages() {
        let postData = this.qs.stringify({
          currentPage: this.currentPage,
          pageSize:this.pageSize
        });
        this.axios({
          method: 'post',
          url:'/getAllByIndex',
          data:postData
        }).then(response =>
        {
          this.totalCount = response.data;
        }).catch(error =>
        {
          console.log(error);
        });
      },
      refreshData() {
        location.reload();
      }
    },
    //初始化界面数据
    created() {
      /*this.axios.get('static/title.json').then(response =>
      {
          this.tableData = response.data.tableData;
          this.total = response.data.tableData.length;
          // console.log(JSON.parse(JSON.stringify(response.data))['tableData'])
      });*/
      let postData = this.qs.stringify({
        currentPage: 1,
        pageSize:2
      });
      this.axios({
        method: 'post',
        url:'/getAllByIndex',
        data:postData
      }).then(response =>
      {
        this.tableData = response.data;
        this.totalCount=response.response;
      }).catch(error =>
      {
        console.log(error);
      });

      /*this.axios.post('/rows').then(response =>
      {
        this.total = response.totalCount;
      }).catch(error =>
      {
        console.log(error);
      });*/

    },
  }
</script>
<style scoped>
  .search_name{
    width: 200px;
  }
  .pages{
    margin: 0px;
    padding: 0px;
    text-align: right;
  }
</style>
