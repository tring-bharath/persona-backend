	create table personaDetails(
		id serial primary key,
		userid int,
		constraint fk_userid foreign key (userid) references userDetails(id),
		quotes text,
		description text,
		attitude text,
		points text,
		jobs text,
		activities text,
		image text
	)

	select * from personaDetails

	truncate table personaDetails