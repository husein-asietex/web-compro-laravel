<?php

namespace App\Policies;

use App\Models\MediaAsset;
use App\Models\User;

class MediaAssetPolicy
{
    public function create(User $user): bool
    {
        return $user->active;
    }

    public function approve(User $user, MediaAsset $mediaAsset): bool
    {
        return $user->isAdmin();
    }
}
