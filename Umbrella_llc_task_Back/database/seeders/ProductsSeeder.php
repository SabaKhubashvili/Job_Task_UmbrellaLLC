<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;



class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 500; $i++) {
            DB::table('products')->insert([
                'title' => 'Test N' . $i,
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque tellus nec lorem commodo, at laoreet mi fringilla. Integer tristique ullamcorper lectus, at cursus neque ullamcorper ac. Mauris semper faucibus ligula, sed lacinia odio. Vivamus commodo est id dolor efficitur commodo. Phasellus consectetur malesuada elit, sed volutpat felis lobortis at. Sed ultrices urna vitae lorem vestibulum, sed aliquet turpis auctor. Aenean vitae eros id elit varius vestibulum vel in tortor. Nulla nec ex ullamcorper, dictum nunc ut, finibus est. Vestibulum elementum felis nec dolor placerat dignissim. Integer in pharetra lorem. Mauris consequat felis sed nisi facilisis vulputate. Fusce dapibus, ex id tristique bibendum, tortor urna tempus tellus, at commodo mauris neque vitae lorem.
                Pellentesque dictum dui nec tortor commodo, vel consectetur mauris luctus. Fusce convallis aliquam enim, in facilisis ligula suscipit ac. Nam ullamcorper, enim non semper tincidunt, nisi purus egestas ex, in bibendum est tellus a velit. Ut vestibulum mauris sed nibh gravida, et efficitur nisi elementum. Quisque mattis justo in velit ullamcorper dignissim. Vivamus placerat finibus cursus. Phasellus a nibh at dui viverra vestibulum. Mauris ac tempor ex. Curabitur fringilla lobortis consectetur.      
                Sed ac odio nec metus gravida auctor. Ut iaculis risus a finibus pellentesque. Mauris efficitur pharetra justo sed efficitur. Nunc blandit quam nec nulla ullamcorper, a dapibus ipsum egestas. Sed sit amet congue nibh, a ultrices tellus. Proin nec ligula a eros consectetur ultrices. Donec feugiat orci vel sem euismod, vitae posuere metus placerat. Sed lobortis, magna et consequat hendrerit, nisl sem egestas purus, eu tristique tortor felis ut velit. In dignissim mauris ac mauris fermentum viverra. Quisque sit amet nunc et sem iaculis finibus. Suspendisse non dui vitae elit lacinia tincidunt. Vestibulum dapibus volutpat risus, a vulputate elit faucibus eget. Nullam venenatis ipsum a metus fermentum, vel vulputate orci lacinia. Nulla facilisi. Nullam volutpat venenatis aliquam. Vestibulum lacinia nisl a justo pretium, in ultrices lorem fringilla. ',
                'price' => rand(100, 500),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
