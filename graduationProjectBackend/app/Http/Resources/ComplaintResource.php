<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComplaintResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'user_id' => new UserResource($this->whenLoaded('user')),
          'service_id' => new ServiceResource($this->whenLoaded('service')),
          'status_id' => new StatusResource($this->whenLoaded('status')),
          'title' => $this->title,
          'description' => $this->description,
          'photo' => $this->photo,
        ];
    }
}
