<?php

namespace App\Policies;

use App\Models\ContentCollection;
use App\Models\User;

class ContentCollectionPolicy
{
    public function update(User $user, ContentCollection $contentCollection): bool
    {
        return $user->active;
    }

    public function publish(User $user, ContentCollection $contentCollection): bool
    {
        return $user->isAdmin();
    }
}
