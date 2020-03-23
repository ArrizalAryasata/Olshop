<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Orders;
use App\detail_Orders;
use App\User;
use App\Alamat;
use App\Products;
use Auth;
class OrdersController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    $orders = [];
    foreach (Orders::all() as $o) {
      $detail = [];
      foreach (detail_Orders::all() as $d) {
        $itemDetail = [
          "id_order" => $d->id_order,
          "id_product" => $d->id_product,
          "quantity" => $d->quantity,
        ];
        array_push($detail, $itemDetail);
    }
    $item = [
      "id_order" => $o->id,
      "id_user" => $o->id_user,
      "id_alm" => $o->id_alm,
      "total" => $o->total,
      "bukti_bayar" => $o->bukti_bayar,
      "status" => $o->status,
    ];
    array_push($order, $item);
  }
  return response(["orders" => $order]);
}

public function accept($id)
  {
    $o = Orders::where("id", $id)->first();
    $o->status = "dikirim";
    $o->save();
  }

public function decline($id)
  {
    $o = Orders::where("id", $id)->first();
    $o->status = "ditolak";
    $o->save();
  }



  public function data($id){
    $user = User::where("id_user", $id)->get();
    return response([
      "user" => $user
    ]);
  }

  public function save(Request $request)
  {

      try {
        $orders = new Orders();
        $orders->id_user = $request->id_user;
        $orders->id_alm = $request->id_alm;
        $orders->total = $request->total;
        $orders->status = "dipesan";
        $orders->save();

        $o = Orders::where("id_user", $request->id_user)->first();
        $detail_orders=new detail_Orders();
        $detail_orders=$o->id_order;
        $detail_orders->id_product = $request->id_product;
        $detail_orders->quantity = $request->quantity;
        $detail_orders->save();


        return response(["message" => "Data order berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }


}


 ?>
