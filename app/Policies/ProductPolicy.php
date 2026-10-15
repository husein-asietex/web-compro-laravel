<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    public function update(User $user, Product $product): bool
    {
        return $user->active;
    }

    public function publish(User $user, Product $product): bool
    {
        return $user->isAdmin();
    }
}
