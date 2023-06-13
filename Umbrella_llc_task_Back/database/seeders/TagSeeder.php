<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{

    public function run(): void
    {
        $tags = ['Shirt', 'Pants', 'T-Shirt', 'Boots', 'Watch'];

        foreach ($tags as $tagName) {
            Tag::create([
                'name' => $tagName,
            ]);
        }
    }
}
