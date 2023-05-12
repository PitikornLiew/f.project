const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const { lime } = require('@mui/material/colors');
const multer = require('multer')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    user: 'i8ngcv5h5mbxffnf6mgs',
    password: 'pscale_pw_zDOilkI3g87WfbTFM4xMJn5YKKaleNVu8lPq6cNxT8J',
    database: 'db_project',
    ssl: { "rejectUnauthorized": true }

});

app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/storage');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
const upload = multer({ storage });

// api for test page reviews
app.get('/api/reviews', function (req, res, next) {
    // เอาไว้เลือก page
    const page = parseInt(req.query.page);
    const per_page = parseInt(req.query.per_page);
    // เรียงลำดับ
    const sort_column = req.query.sort_column;
    const sort_direction = req.query.sort_direction;
    // ค้นหา
    const search = req.query.search;
    // เลือกว่าเริ่มจากหน้าไหนถึงหน้าไหน
    const start_idx = (page - 1) * per_page;

    var params = [];
    var sql = 'SELECT * FROM reviews ';
    if (search) {
        sql += ' WHERE name LIKE ?'
        params.push('%' + search + '%')
    }
    if (sort_column) {
        sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
    }
    sql += ' LIMIT ?, ?'
    params.push(start_idx)
    params.push(per_page)

    connection.execute(sql, params,
        function (err, results, fields) {
            // simple query
            connection.query(
                'SELECT COUNT (id) as total FROM reviews',
                function (err, counts, fields) {
                    const total = counts[0]['total'];
                    const total_pages = Math.ceil(total / per_page)
                    res.json({
                        page: page,
                        per_page: per_page,
                        total_pages: total_pages,
                        total: total,
                        data: results
                    })
                }
            );

        }
    );
});

// api for test page community
app.get('/api/product', function (req, res, next) {
    // เอาไว้เลือก page
    const page = parseInt(req.query.page);
    const per_page = parseInt(req.query.per_page);
    // เรียงลำดับ
    const sort_column = req.query.sort_column;
    const sort_direction = req.query.sort_direction;
    // ค้นหา
    const search = req.query.search;
    // เลือกว่าเริ่มจากหน้าไหนถึงหน้าไหน
    const start_idx = (page - 1) * per_page;

    var params = [];
    var sql = 'SELECT * FROM product ';
    if (search) {
        sql += ' WHERE name LIKE ?'
        params.push('%' + search + '%')
    }
    if (sort_column) {
        sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
    }
    sql += ' LIMIT ?, ?'
    params.push(start_idx)
    params.push(per_page)

    connection.execute(sql, params,
        function (err, results, fields) {
            // simple query
            connection.query(
                'SELECT COUNT (id) as total FROM product',
                function (err, counts, fields) {
                    const total = counts[0]['total'];
                    const total_pages = Math.ceil(total / per_page)
                    res.json({
                        page: page,
                        per_page: per_page,
                        total_pages: total_pages,
                        total: total,
                        data: results
                    })
                }
            );

        }
    );
});

app.post('/users', (req, res) => {
    // สร้างผู้ใช้งานใหม่โดยใช้ข้อมูลจาก request body
    // แล้วเพิ่มข้อมูลลงในฐานข้อมูล
});

app.get('/posts', (req, res) => {
    // ค้นหาโพสต์ทั้งหมดจากฐานข้อมูล
    // แล้วส่งกลับเป็น JSON
});

app.post('/posts/add', upload.single('image_product'), (req, res) => {
    // สร้างโพสต์ใหม่โดยใช้ข้อมูลจาก request body
    // แล้วเพิ่มข้อมูลลงในฐานข้อมูล

    // Get the uploaded file information
    const image_product = req.file.filename;
    const { id, product_name } = req.body;

    // Store the product information and file name in the database
    let query = `INSERT INTO Product (id, product_name, image_product) VALUES ('${id}', '${product_name}', '${image_product}' )`;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(results);
        }
    });
});

app.listen(5003, () => {
    console.log('Server started on port 5003');
});
