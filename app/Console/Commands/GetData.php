<?php
namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Actions\GetData as GetDataAction;

class GetData extends Command
{
  protected $signature = 'get:data';

  protected $description = 'Gets data from the flatfox api';

  public function handle()
  {
    $data = (new GetDataAction())->execute();


    dd($data->slice(1)[0]);

    $this->info('Data got successfully!');
  }
}