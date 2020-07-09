heroku ps
heroku pg:psql << EOF
\x
\COPY techweek.participant to '~/DATABASE/participant.csv' with (format csv, delimiter ',', header true);
\COPY techweek.csoffline to '~/DATABASE/csoffline.csv' with (format csv, delimiter ',', header true);
\COPY techweek.hackathon to '~/DATABASE/hackathon.csv' with (format csv, delimiter ',', header true);
\COPY techweek.blackflag to '~/DATABASE/blackflag.csv' with (format csv, delimiter ',', header true);
\COPY techweek.informalquiz to '~/DATABASE/informalquiz.csv' with (format csv, delimiter ',', header true);
\COPY techweek.magna to '~/DATABASE/magna.csv' with (format csv, delimiter ',', header true);
\COPY techweek.ppevent to '~/DATABASE/ppevent.csv' with (format csv, delimiter ',', header true);
\COPY techweek.scientia to '~/DATABASE/scientia.csv' with (format csv, delimiter ',', header true);
\COPY techweek.treasurehunt to '~/DATABASE/treasurehunt.csv' with (format csv, delimiter ',', header true);
select count(*) as Participant from techweek.participant where id!=202046000;
select count(*) as CSOffline from techweek.csoffline where csoffline_team_id!=20000;
select count(*) as Hackathon from techweek.hackathon where team_id!=26000;
select count(*) as BlackFlag from techweek.blackflag where blackflag_team_id!=21000;
select count(*) as InformalQuiz from techweek.informalquiz where infoquiz_team_id!=23000;
select count(*) as Magna from techweek.magna;
select count(*) as PPEvent from techweek.ppevent;
select count(*) as Scientia from techweek.scientia;
select count(*) as TreasureHunt from techweek.treasurehunt where treasurehunt_team_id!=24000;
EOF