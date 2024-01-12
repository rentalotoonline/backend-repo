export default class AppConstants{
  static  MESSAGES={
    CREATED:"DATA BERHASIL TERSIMPAN",
    UPDATED:"DATA BERHASIL TERUPDATE",
    DELETED: "DATA BERHASIL TERHAPUS",
    SUCCESS:"BERHASIL",
    BAD_REQUEST:"SILAHKAN HUBUNGI ADMINISTRATOR IT ANDA",
    FORBIDDEN:"YOU ARE NOT AUTHORIZED",
    NOT_FOUND: "DATA YANG ANDA CARI TIDAK DITEMUKAN",
    DATA_IS_NOT_ROLE: "DATA TIDAK TERMASUK DALAM KATEGORI ROLE",
	INVALID_UNAME: "EMAIL ATAU PASSWORD TIDAK VALID"
  }
  static DB_ENV_KEYS={
    HOST:"DB_HOST",
    PORT:"DB_PORT",
    USER:"DB_USERNAME",
    PASSWORD:"DB_PASSWORD",
    DATABASE:"DB_DATABASE",
  }

  static APPLICATION_PARAMETER_GROUP_TYPES={
    ROLE:"APP_ROLE",
    CAR_TYPE:"APP_CAR_TYPE",
    TRX_STATUS:"TRX_STATUS",
    DETAIL_TYPE:"chcarge_items",
  }
  static CIPHER = {
    ALGO:"aes-256-ctr",
    SALT_ROUND:10,
  }
  static DESTINATION_TYPE={
    INNER_CITY:"Dalam Kota",
    OUTER_CITY:"Luar Kota",
  }
  static RENTAL_TYPE={
    WITH_DRIVER:"Dengan Supir",
    WITHOUT_DRIVER:"Tanpa Supir"
  }
  static RENT_ITEM_TYPE={
    discount:"Potongan Harga",
    admin_pay:"Biaya Admin",
    driver:"Biaya Tambahan(Jika Menggunakan Driver)",
    charge:"Denda Keterlambatan(perhari)"
  }
  static RENT_ITEM_TYPE_ID={
    discount:19999,
    admin_pay:19998,
    driver:19997,
    charge:19996
  }
  static ADMIN_DEF_PAYMENT=0.1
  static CHARGE_AMOUNT=0.05
  static TRX_STATUS_ARRAY={
    CREATED:{
      value:"CREATED",
      code:"trx_status_created"
    },
    PICK_UP:{
      value:"PICKING UP",
      code:"trx_status_picking_up"
    },

    HAS_RENT:{
      value:"HAS RENT",
      code:"trx_status_has_rent"
    },

    COMPLETED:{
      value:"COMPLETED",
      code:"trx_status_completed"
    },
    CANCELED:{
      value:"CANCELED",
      code:"trx_status_canceled"
    },

  }
  static ADMIN_PAYMENT_PARAMETER="charge_admin";
  static DRIVER_PAYMENT_PARAMETER="charge_biaya_supir";
  static DISCOUNT_PARAMETER="discount";
  static RELATIONS_ARRAY = {
    RentDetails:{
      appParam:['appParam'],
      cars:['cars','cars.driver']
    }
  }
  static CHARGE_PERCENTAGE: number = 0.8
}