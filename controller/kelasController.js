var connection = require("../library/database");

const getAllkelas = function (req, res) {
  connection.query("SELECT * FROM kelas", function (err, rows) {
    if (err) {
      res.send("error", err);
      res.json({
        data: "",
      });
    } else {
      res.json({
        data: rows,
      });
    }
  });
};

const getKelasid = function (req, res) {
  let id = req.params.id;
  connection.query("SELECT * FROM kelas WHERE id=" + id, function (err, rows) {
    if (err) {
      res.send("error", err);
      res.json({
        data: "",
      });
    } else {
      res.json({
        data: rows,
      });
    }
  });
};

const createKelas = function (req, res) {
  let nama_jurusan = req.body.nama_jurusan;
  let deskripsi = req.body.deskripsi;
  let errors = false;

  if (!nama_jurusan) {
    errors = true;
    res.json({
      pesan:
        " Field nama_jurusan belum di isi, field harus di isi dengan lengkap",
    });
  }

  if (!deskripsi) {
    errors = true;
    res.json({
      pesan: " Field descripsi belum di isi, field harus di isi dengan lengkap",
    });
  }

  if (!errors) {
    let formData = {
      nama_jurusan: nama_jurusan,
      deskripsi: deskripsi,
    };
    connection.query(
      "INSER INTO kelas SET ?",
      formData,
      function (err, result) {
        if (err) {
          res.json({
            pesan: "Data gagal di Simpan",
          });
        } else {
          res.send("Data berhasil disimpan");
        }
      }
    );
  }
};

const updateKelas = function (req, res) {
  let id = req.params.id;
  let nama_jurusan = req.body.nama_jurusan;
  let deskripsi = req.body.deskripsi;
  let errors = false;

  if (!nama_jurusan) {
    errors = true;
    res.json({
      pesan: " Field nama_jurusan tidak boleh kosong",
    });
  }

  if (!deskripsi) {
    errors = true;
    res.json({
      pesan: " Field descripsi tidak boleh kosong",
    });
  }

  if (!errors) {
    let formData = {
      nama_jurusan: nama_jurusan,
      deskripsi: deskripsi,
    };

    //update query
    connection.query(
      "UPDATE kelas SET ? WHERE id = " + id,
      formData,
      function (err, result) {
        //if(err) throw err
        if (err) {
          res.send("error", err);
          res.json({
            id: req.params.id,
            nama_jurusan: formData.nama_jurusan,
            deskripsi: formData.deskripsi,
          });
        } else {
          res.send("Data berhasil Diupdate!");
        }
      }
    );
  }
};

const deleteKelas = function (req, res) {
  let id = req.params.id;

  //update query
  connection.query(
    "DELETE FROM kelas WHERE id = " + id,
    function (err, result) {
      //if(err) throw err
      if (err) {
        res.send("Data berhasil Dihapus!");
      }
    }
  );
};

module.exports = {
  getAllkelas,
  getKelasid,
  createKelas,
  updateKelas,
  deleteKelas,
};
