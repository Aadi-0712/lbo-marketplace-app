package com.example.lbo_marketplace.data.model

data class UserProfile(

    val uid: String = "",

    val name: String = "",

    val email: String = "",

    // 🔥 PHONE
    val phone: String = "",

    // 🔥 PROFILE IMAGE
    val profileImageUrl: String = "",

    // 🔥 ROLE
    val role: String = "USER",

    // 🔥 ACCOUNT STATUS
    val active: Boolean = true,

    // 🔥 PROVIDER STATUS
    val providerApproved: Boolean = false,

    // 🔥 LOCATION
    val latitude: Double = 0.0,

    val longitude: Double = 0.0,

    // 🔥 TIMESTAMP
    val createdAt: Long = System.currentTimeMillis()
)