from django.contrib import admin
from records.models import Record, CustomUser, SubRecord, Proposition, PropositionItem, PropositionItemImage, AskRecordItem, AskRecordItemImage, Feedback

# Register your models here.
admin.site.register(SubRecord)
admin.site.register(PropositionItemImage)
admin.site.register(AskRecordItemImage)
admin.site.register(Feedback)


class SubRecordInline(admin.TabularInline):
    model = SubRecord


class AskRecordItemInline(admin.TabularInline):
    model = AskRecordItem


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    inlines = [
        SubRecordInline,
        AskRecordItemInline
    ]


class PropositionItemInline(admin.TabularInline):
    model = PropositionItem


@admin.register(Proposition)
class PropositionAdmin(admin.ModelAdmin):
    inlines = [PropositionItemInline, ]


class PropositionItemImageInline(admin.TabularInline):
    model = PropositionItemImage


@admin.register(PropositionItem)
class PropositionItemAdmin(admin.ModelAdmin):
    inlines = [PropositionItemImageInline]


class AskRecordItemImageInline(admin.TabularInline):
    model = AskRecordItemImage


@admin.register(AskRecordItem)
class AskRecordItemAdmin(admin.ModelAdmin):
    inlines = [AskRecordItemImageInline, ]
