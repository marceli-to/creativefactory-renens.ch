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

    // remove ref_object = '00D03'
    $data = $data->where('ref_object', '!=', '00D03');

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
    // and set to 1
    $data = $data->map(function ($item, $key) {
      if ($item['number_of_rooms'] === null) {
        $item['number_of_rooms'] = "1.0";
      }
      return $item;
    });

    // search for description_title that contain 'pièces avec pièce atelier'
    // and set number_of_rooms to number_of_rooms + 1 and ref_object "02A02" or "03A02" set number_of_rooms to number_of_rooms + 1
    // since in both cases the "default" value is 1 too high, we need to correct for that
    $plus_ones = [
      "01A06",
      "01A08",
      "01A10",
      "01A12",
      "01A18",
      "01B02",
      "01B06",
      "01B08",
      "01B10",
      "01B14",
      "02A02",
      "02A08",
      "02A10",
      "02A12",
      "02A18",
      "02B02",
      "02B06",
      "02B08",
      "02B10",
      "02B14",
      "03A02",
      "03A08",
      "03A10",
      "03A12",
      "03A18",
      "03B02",
      "03B06",
      "03B08",
      "03B10",
      "03B14"
    ];
    
    $data = $data->map(function ($item, $key) use ($plus_ones) {
      if (in_array($item['ref_object'], $plus_ones)) {
        $item['number_of_rooms_fixed'] = ($item['number_of_rooms'] - 1) . "+1";
      }
      return $item;
    });

    $shops = $data->filter(function($item) {
      return $item['object_type'] === 'SHOP' || $item['object_type'] === 'ATELIER';
    });
  
    $apartments = $data->filter(function($item) {
      return $item['object_type'] !== 'SHOP' && $item['object_type'] !== 'ATELIER';
    });
  
    return [
      'apartments' => collect($apartments)->sortBy('floor')->sortBy('ref_object'),
      'shops' => collect($shops)->sortBy('floor')->sortBy('ref_object'),
    ];
  }
}
