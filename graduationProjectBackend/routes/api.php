<?php

use App\Http\Controllers\TalepDegerlendirmeController;
use App\Http\Controllers\VerifyTheComplaintController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComplaintController;
use \Spatie\Permission\Middleware\RoleMiddleware;

Route::post('/auth/register', [\App\Http\Controllers\AuthApiController::class, 'register'])->name('auth.register');
Route::post('/auth/login',[\App\Http\Controllers\AuthApiController::class,'login'])->name('auth.login');
Route::middleware('auth:sanctum')->post('/auth/logout',[\App\Http\Controllers\AuthApiController::class,'logout'])->name('logOut');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

 //   Route::get('/showComplaint',[ComplaintController::class, 'index'])->name('showComplaint');
  //  Route::post('/addComplaint',[ComplaintController::class, 'store'])->name('addComplaint');
 //   Route::get('/findComplaint/{id}',[ComplaintController::class, 'show'])->name('findComplaint');
  //  Route::patch('/updateComplaint/{id}', [ComplaintController::class, 'update'])->name('updateComplaint');
 //   Route::delete( '/deleteComplaint/{id}', [ComplaintController::class, 'destroy'])->name('deleteComplaint');

    Route::get('/getComplaint', [ComplaintController::class, 'index'])->name('getComplaint');
    Route::post('/addComplaint', [ComplaintController::class, 'store'])->name('addComplaint');
    Route::get( '/getTalepDegerlendirme', [TalepDegerlendirmeController::class, 'index'])->name('getTalepDegerlendirme');
    Route::post('/deleteComplaints', [ComplaintController::class, 'destroy'])->name('deleteComplaints');
    Route::post('/updateProfilePhoto', [\App\Http\Controllers\UserController::class, 'updatePhoto'])->name('updateProfilePhoto');

    Route::get('/getService' ,[App\Http\Controllers\ServiceController::class, 'index'])->name('getService');

    Route::get('/profile', [\App\Http\Controllers\UserController::class, 'profile'])->name('profile');
    Route::get('/getUserDetails', [\App\Http\Controllers\UserController::class, 'index'])->name('getUserDetails');
    Route::get('/getApprovedComplaint', [\App\Http\Controllers\ComplaintController::class, 'approvedComplaint'])->name('getApprovedComplaint');
    Route::get('/getRejectedComplaint', [\App\Http\Controllers\ComplaintController::class, 'rejectedComplaint'])->name('getRejectedComplaint');
    Route::post('/feedback', [VerifyTheComplaintController::class, 'submitFeedback'])->name('submitFeedback');
    Route::get('/verified-complaints', [VerifyTheComplaintController::class, 'getVerifiedComplaints']);
    Route::get('/getUserSurveys', [\App\Http\Controllers\SurveyController::class, 'getUserSurveys'])->name('getUserSurveys');
});





