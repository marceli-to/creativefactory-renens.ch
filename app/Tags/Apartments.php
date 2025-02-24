<?php
namespace App\Tags;
use App\Actions\GetData;
use Statamic\Tags\Tags;

class Apartments extends Tags
{
  public function index()
  {
  }

  public function get()
  {
    // get data from api or storage
    $data = (new GetData)->execute();

    // we need to manually set "floor": to -1 for apartments with:
    // "ref_object":"-1B02"
    // "ref_object":"-1B04" 
    // "ref_object":"-1B06"

    $data = $data->map(function ($item, $key) {
      if ($item['ref_object'] == '-1B02' || $item['ref_object'] == '-1B04' || $item['ref_object'] == '-1B06') {
        $item['floor'] = -1;
      }
      return $item;
    });

    // search for "number_of_rooms" => null
    //  => collect them and extract the ref_object
    // $no_rooms = $data->where('number_of_rooms', null);
    // $no_rooms = $no_rooms->pluck('ref_object');

    // search for "surface_living" => null
    //  => collect them and extract the ref_object and object_type
    // $no_surface_living = $data->whereNull('surface_living')
    //     ->map(function ($item) {
    //         return [
    //             'ref_object' => $item["ref_object"],
    //             'object_type' => $item["object_type"]
    //         ];
    //     });

    // dd($no_surface_living);

    // Debug:
    // get the entry for "ref_object":"03A01"
    // $apartment = $data->firstWhere('ref_object', '03A01');
    // dd($apartment);

    // search for "number_of_rooms" => null
    // and set to 1
    // $data = $data->map(function ($item, $key) {
    //   if ($item['number_of_rooms'] === null) {
    //     $item['number_of_rooms'] = "1.0";
    //   }
    //   return $item;
    // });

    // search for description_title that contain 'pièces avec pièce atelier'
    // and set number_of_rooms to number_of_rooms - 1

    $data = $data->map(function ($item, $key) {
      if (\Str::contains($item['description_title'], 'pièces avec pièce atelier')) {
        $item['number_of_rooms_fixed'] = ($item['number_of_rooms'] - 1) . "+1";
      }
      return $item;
    });


    $apartments = collect($data)->sortBy('floor');

    return [
      'apartments' => $apartments,
    ];
  }
}
