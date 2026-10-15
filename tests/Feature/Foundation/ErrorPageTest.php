<?php

it('returns a real 404 response for an unknown route', function () {
    $response = $this->get('/missing-page');

    $response->assertNotFound();
});
