from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea

# Register your models here.


class UserAdminConfig(UserAdmin):
    model = CustomUser
    search_fields = ('email', 'username', 'first_name',)
    list_filter = ('email', 'username', 'first_name', 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'username', 'first_name',
                    'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'first_name', 'last_name', 'is_pro', "phone_number",
                           "checked_email", "checked_phone", "checked_billet")}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'is_pro', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(CustomUser, UserAdminConfig)
