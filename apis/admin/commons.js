function create_common(name, user_id,
                       cow_price, milk_time,
                       start_date, end_date) {
    db.Commons.build({
        admin_uid: user_id,
        name: name,
    }).save();
    db.Configs.build({
        milkTime: milk_time,
        cowPrice: cow_price,
        startDate: start_date,
        endDate: end_date
    }).save();
    return true;
}
