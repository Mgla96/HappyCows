function create_commons(name) {
	db.Cows.build({
		name: name,
	}).save()
	return true;
}
